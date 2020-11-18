from functools import wraps
from flask import Flask, request, make_response
from flask.wrappers import Response
from flask_cors import CORS
from sqlalchemy import exc
from .db import session
from .models import User, Item
from .helpers import generate_public_url, encrypt, decrypt, create_hash
import flask
import json
import os
import datetime


def create_app(test_config=None, *args, **kwargs):
    # создаем и настраиваем приложение
    app = Flask(__name__, instance_relative_config=True,
                static_folder=f"./build", static_url_path="/")
    app.config.from_mapping(
        SECRET_KEY=os.getenv("FLASK_SECRET_KEY")
    )

    # CORSify app so we can receive data from client on another port
    CORS(app, supports_credentials=True)

    # удостоверяемся, что папка для приложения создана
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    ### USER & AUTH  ###

    # checks if token exists
    # wrapped func will have access to it
    def check_token_validity(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = request.cookies.get('token')
            if not token:
                return flask.Response('Could not find token in cookies', status=401)
            return func(*args, **kwargs)
        return wrapper

    # check if user with token exists
    def get_user_from_token(token):
        try:
            id = decrypt(token)
            if not id:
                raise Exception('Token must contain user ID')
        except Exception:
            raise Exception
        try:
            user = session.query(User).filter_by(id=id).first()
            return user
        except Exception as e:
            print(e)
            raise Exception

    # refresh token on each request
    # if token is present
    @app.after_request
    def check_token_expiration(response):
        token = request.cookies.get('token')
        # refresh token
        # if we were not logged out
        if token and response.response[0] != b'Logged out':
            token_lifetime = int(os.getenv('TOKEN_LIFETIME'))
            user = get_user_from_token(token)
            if user:
                token = encrypt(str(user.id))
                response.set_cookie('token', token, httponly=True,
                                    max_age=token_lifetime, samesite='Strict')
                return response
            else:
                response.set_cookie('token', '', httponly=True,
                                    max_age=0, samesite='Strict')
        return response

    # authenticate user after successful Google / Facebook authorization
    # return session token
    @app.route("/api/auth/login", methods=["POST"])
    def login():
        data = request.get_json()
        if not data:
            return make_response(
                'Must provide credentials', 400)
        google_id = create_hash(data.get("google_id"))
        facebook_id = create_hash(data.get("facebook_id"))
        print(google_id)
        try:
            if google_id:
                user = session.query(User).filter_by(
                    google_id=google_id).first()
            elif facebook_id:
                user = session.query(User).filter_by(
                    facebook_id=facebook_id).first()
            else:
                response = make_response(
                    'Must provide google or facebook ID to log in', 400)
                return response
        except Exception as e:
            return make_response(f'Error while trying to authenticate: {e}', 500)
        if user:
            token = encrypt(str(user.id))
            response = make_response(f'Authenticated', 200)
            response.set_cookie('token', token, httponly=True,
                                max_age=int(os.getenv('TOKEN_LIFETIME')), samesite='Strict')
            response.set_cookie('token_iat', str(datetime.datetime.now()), httponly=True,
                                samesite='Strict')
            return response
        return make_response("User not found. Try registering", 204)

    # log out (clear token from user cookies)
    @app.route("/api/auth/logout", methods=["GET"])
    def logout():
        token = request.cookies.get("token")
        if not token:
            return flask.Response('Request must provide token for logout', 400)
        response = make_response('Logged out', 204)
        response.set_cookie('token', '', expires=0)
        return response

    # add new user

    @app.route("/api/auth/register", methods=["POST"])
    def add_user():
        data = request.get_json()
        google_id = create_hash(data.get("google_id"))
        facebook_id = create_hash(data.get("facebook_id"))
        # check if user already exists
        try:
            if google_id:
                user = session.query(User).filter_by(
                    google_id=google_id).first()
            elif facebook_id:
                user = session.query(User).filter_by(
                    facebook_id=facebook_id).first()
        except Exception:
            return flask.Response('Error checking if user already exists', 500)
        if user:
            return flask.Response('User already exists', 200)
        # if user does not exist, create one
        try:
            try:
                # generate a few public_url just in case
                # and check if they are not duplicate
                public_urls = [str(generate_public_url(data["name"]))
                               for _ in range(10)]
                for public_url in public_urls:
                    user_with_same_public_url = session.query(User).filter_by(
                        public_url=public_url).first()
                    if not user_with_same_public_url:
                        unique_public_url = public_url
                        break
            except Exception as e:
                return flask.Response('Error generating public URL', status=500)
            new_user = User(
                name=data["name"], facebook_id=facebook_id, google_id=google_id, public_url=unique_public_url)
        except Exception as e:
            return flask.Response("Error processing new user before registering", status=500)
        try:
            session.add(new_user)
            session.commit()
            return flask.Response("Added user", status=201)
        except exc.IntegrityError:
            session.rollback(
                'Integrity error when adding new user. Check if user with similar facebook/google ID exists', 400)
        except Exception as e:
            session.rollback()
            return flask.Response("Error adding user", status=500)

    # get current user info (for auth)

    @app.route("/api/auth/user", methods=["GET"])
    @check_token_validity
    def get_current_user():
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if user:
            response = make_response(user.to_json(), 200)
            response.headers.add("ContentType", "application/json")

            return response
        return flask.Response("User not found", status=204)

    # get any user info by public url (for displaying wishlist)
    @app.route("/api/users", methods=["GET"])
    def get_user_by_public_url():
        try:
            public_url = request.args.get('public_url')
            if not public_url:
                return flask.Response('Must provide user\'s public url for search', 400)
            user = session.query(User).filter_by(public_url=public_url).first()
            response = make_response(user.to_json_short(), 200)
            response.headers.add('Content-Type', 'application/json')
            return response
        except Exception:
            return flask.Response('Error getting user info', 500)

    # update user
    # for now, only change username
    @app.route("/api/users/<user_id>", methods=["PUT"])
    @check_token_validity
    def update_user(user_id):
        if not user_id:
            return flask.Response("Must provide user id", status=400)
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", 401)
        if str(user.id) != user_id:
            return flask.Response(f"Error trying to edit user other than yourself: id from cookies {user.id}, id from url {user_id}", 400)
        try:
            data = request.get_json()
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return flask.Response("User not found", status=204)
            user.name = data.get("name")
            user.birthday = data.get("birthday")
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response("Error updating user info", status=500)
        return flask.Response("Updated user", status=200)

    ### WISHLIST ITEMS ###

    # get items for specific user
    @app.route("/api/users/<user_id>/items", methods=["GET"])
    def get_items(user_id):
        try:
            items = session.query(Item).filter_by(user_id=user_id)
            items = [i.to_json() for i in items]
        except Exception as e:
            return flask.Response('Error getting wishlist items', status=500)
        return json.dumps(items), 200, {"ContentType": "application/json"}

    # add item
    @app.route("/api/items", methods=["POST"])
    @check_token_validity
    def add_item():
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        data = request.get_json()
        user_id = data.get("user_id")
        if not data or not user_id:
            return flask.Response("Must provide item data with user_id", status=400)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        try:
            new_item = Item(user_id=data["user_id"], name=data.get("name"), price=int(data.get("price")),
                            url=data.get("url"), group_purchase=data.get("group_purchase"))
            session.add(new_item)
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response("Error adding item", status=500)
        return flask.Response("Added item", status=201)

    # update item info
    @app.route("/api/items/<item_id>", methods=["PUT"])
    @check_token_validity
    def update_item(item_id):
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        data = request.get_json()
        item = session.query(Item).filter_by(id=item_id).first()
        if not data or not item:
            return flask.Response(data, status=400)
        try:
            item.name = data["name"]
            item.price = int(data["price"])
            item.url = data["url"]
            item.group_purchase = data["group_purchase"]
            item.gifters = data["gifters"]
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response('Error updating item', status=500)
        return flask.Response("Updated item", status=200)

    # update item's gifters
    # unprotected because it's available to unregistered users
    @app.route("/api/items/<item_id>/update_gifters", methods=["PUT"])
    def update_item_gifters(item_id):
        data = request.get_json()
        item = session.query(Item).filter_by(id=item_id).first()
        if not data or not item:
            return flask.Response(data, status=400)
        try:
            gifters = data.get('gifters')
            if gifters:
                if item.gifters:
                    item.gifters = ', '.join(data['gifters'])
                else:
                    item.gifters = gifters[0]
            session.commit()
        except Exception as e:
            session.rollback()
            print(e)
            return flask.Response('Error updating item', status=500)
        return flask.Response("Updated item", status=200)

    # delete item
    @app.route("/api/items/<item_id>", methods=["DELETE"])
    @check_token_validity
    def delete_item(item_id):
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        item = session.query(Item).filter_by(id=item_id).first()
        if not item:
            return flask.Response("Item not found", status=204)
        try:
            session.query(Item).filter_by(id=item_id).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response('Error deleting item', status=500)
        return flask.Response('Item deleted', status=200)

    ### SEARCH ###
    # TODO
    @app.route("/api/users/search", methods=["GET"])
    def search_users():
        query = request.args.get('q')
        if not query or len(query) < 3:
            return flask.Response("Must provide search query longer than 2 characters", status=400)
        try:
            results = session.query(User).filter(
                User.name.ilike(f"%{query}%") | User.public_url.ilike(f"%{query}%"))
            if not results:
                return '[]', 204, {"ContentType": "application/json"}
            users = [u.to_json_short() for u in results]
            return json.dumps(users), 200, {"ContentType": "application/json"}
        except Exception as e:
            flask.Response('Error searching users', status=500)

    ### FAVORITE USERS ###

    # get a list of user's favorite users
    @app.route("/api/users/<owner_user_id>/favorites", methods=["GET"])
    @check_token_validity
    def get_favorite_users(owner_user_id):
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        try:
            favorites = [u.to_json_short() for u in user.favorite_persons]
            return json.dumps(favorites), 200, {"ContentType": "application/json"}
        except Exception as e:
            return flask.Response('Error getting favorite people', status=500)

    # add a new favorite user
    @app.route("/api/users/<owner_user_id>/favorites", methods=["POST"])
    @check_token_validity
    def add_favorite_user(owner_user_id):
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        try:
            new_favorite_user_id = request.get_json().get("user_id")
            if not new_favorite_user_id:
                return flask.Response("Must provide new favorite user id", status=400)
            new_favorite_user = session.query(
                User).filter_by(id=new_favorite_user_id).first()
            if not new_favorite_user:
                return flask.Response("Could not find new favorite user in database. Check if ID is valid", status=400)
            user.favorite_persons.append(new_favorite_user)
            session.commit()
            return flask.Response('Added user to vaforite users', status=200)
        except Exception as e:
            session.rollback()
            return flask.Response(f'Error adding user to favorite people', status=500)

    # remove person from user's favorites
    @app.route("/api/users/<owner_user_id>/favorites", methods=["DELETE"])
    @check_token_validity
    def remove_favorite_user(owner_user_id):
        token = request.cookies.get('token')
        user = get_user_from_token(token)
        if not user:
            return flask.Response("Authorized user not found", status=401)
        try:
            new_favorite_user_id = request.get_json().get("user_id")
            if not new_favorite_user_id:
                return flask.Response("Must provide favorite user id", status=400)
            new_favorite_user = session.query(
                User).filter_by(id=new_favorite_user_id).first()
            if not new_favorite_user:
                return flask.Response("Could not find favorite user in database. Check if ID is valid", status=400)
            user.favorite_persons.remove(new_favorite_user)
            session.commit()
            return flask.Response('Removed person from favorite people', status=200)
        except Exception as e:
            session.rollback()
            return flask.Response(f'Error removing person from user\'s favorite people: {e}', status=500)

    # return app instance
    return app


app = create_app()
