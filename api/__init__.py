from flask import Flask, request
from flask_cors import CORS
from .db import session
from .models import User, Item
from .helpers import generate_public_url
import flask
import json
import os


def create_app(test_config=None, *args, **kwargs):
    # создаем и настраиваем приложение
    app = Flask(__name__, instance_relative_config=True,
                static_folder=f"./build", static_url_path="/")
    app.config.from_mapping(
        SECRET_KEY=os.getenv("FLASK_SECRET_KEY")
    )

    # CORSify app so we can receive data from client on another port
    CORS(app)

    # if test_config is None:
    #     # если не тестим - загружаем боевой конфиг
    #     app.config.from_pyfile("config.py", silent=True)
    # else:
    #     app.config.from_mapping(test_config)

    # удостоверяемся, что папка для приложения создана
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    ### USER  ###

    # get user info
    @app.route("/api/users", methods=["GET"])
    def get_user():
        id = request.args.get("id")
        google_id = request.args.get("google_id")
        facebook_id = request.args.get("facebook_id")
        public_url = request.args.get("public_url")
        try:
            if id:
                user = session.query(User).filter_by(id=id).first()
            elif google_id:
                user = session.query(User).filter_by(
                    google_id=google_id).first()
            elif facebook_id:
                user = session.query(User).filter_by(
                    facebook_id=facebook_id).first()
            elif public_url:
                user = session.query(User).filter_by(
                    public_url=public_url).first()
            else:
                return flask.Response('User ID, Google / Facebook ID, or public url must be provided', status=400)
        except Exception as e:
            return flask.Response(f'Error while trying to find user: {e}', status=500)
        if user:
            return user.to_json(), 200, {"ContentType": "application/json"}
        return flask.Response("User not found", status=204)

    # add new user
    @app.route("/api/users", methods=["POST"])
    def add_user():
        try:
            data = request.get_json()
            try:
                public_url = str(generate_public_url(data["name"]))
            except Exception as e:
                return flask.Response('Error generating public URL', status=500)
            new_user = User(
                name=data["name"], facebook_id=data.get("facebook_id"), google_id=data.get("google_id"), public_url=public_url)
        except Exception as e:
            return flask.Response("Error processing new user before registering", status=500)
        try:
            session.add(new_user)
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response("Error adding user", status=500)
        return flask.Response("Added user", status=201)

    # update user
    # TODO
    @app.route("/api/users/<user_id>", methods=["PUT"])
    def update_user(user_id):
        if not user_id:
            return flask.Response("Must provide user id", status=400)
        try:
            data = request.get_json()
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return flask.Response("User not found", status=204)
            user.name = data.get("name")
            user.facebook_id = data.get("facebookID")
            user.google_id = data.get("googleID")
            user.public_url = generate_public_url(data["name"])
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
    def add_item():
        data = request.get_json()
        if not data or not data["user_id"]:
            return flask.Response("Must provide item data with user_id", status=400)
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
    # TODO
    @app.route("/api/items/<item_id>", methods=["PUT"])
    def update_item(item_id):
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

    # delete item
    # TODO
    @app.route("/api/items/<item_id>", methods=["DELETE"])
    def delete_item(item_id):
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
            users = [u.to_json() for u in results]
            return json.dumps(users), 200, {"ContentType": "application/json"}
        except Exception as e:
            flask.Response('Error searching users', status=500)

    return app
