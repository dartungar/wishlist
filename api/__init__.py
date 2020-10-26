from flask import Flask, session, request, send_from_directory
from flask_cors import CORS
from .db import session
from .models import User, Item
from uuid import uuid4
import flask
import json
import os
import werkzeug


def create_app(test_config=None, *args, **kwargs):
    # создаем и настраиваем приложение
    app = Flask(__name__, instance_relative_config=True,
                static_folder=f"./build", static_url_path="/")
    app.config.from_mapping(
        SECRET_KEY=os.getenv('FLASK_SECRET_KEY')
    )

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

    # CORSify app so we can receive data from client on another port
    CORS(app)

    ### USER & AUTH ###

    # authenticate: generate JWT if user exists
    # TODO
    @app.route('/api/auth', methods=['POST'])
    def auth():
        data = request.get_json()
        pass

    # get user info
    # TODO

    @app.route('/api/users/<user_id>')
    def get_user(user_id):
        user = session.query(User).filter_by(id=user_id).first()
        return user.to_json(), 200, {'ContentType': 'application/json'}

    # add new user

    @app.route('/api/users/', methods=['POST'])
    # TODO
    def add_user():
        try:
            data = request.get_json()
            print(data)
            new_user = User(id=uuid4(
            ), name=data['name'], facebook_id=data['facebookID'], google_id=data['googleID'])
        except Exception as e:
            return flask.Response('Bad format of User object', status=400)
        try:
            session.add(new_user)
            session.commit()
        except Exception as e:
            return flask.Response('Error adding user!', status=500)
        return 'Added user!', 200, {'ContentType': 'application/json'}

    # update user
    # TODO
    @ app.route('/api/users/<user_id>', methods=['PUT'])
    def update_user(user_id):
        if not user_id:
            return flask.Response('Must provide user id', status=400)
        try:
            data = request.get_json()
            user = session.query(User).filter_by(id=user_id).first()
            if not user:
                return flask.Response('User not found', status=400)
            user.name = data['name']
            user.facebook_id = data['facebookID']
            user.google_id = data['googleID']
            session.commit()
        except Exception as e:
            return flask.Response('Error updating user info', status=500)
        return 'Updated user!', 200, {'ContentType': 'application/json'}

    ### WISHLIST ITEMS ###

    # get items for specific user
    # TODO
    @ app.route('/api/users/<user_id>/items/')
    def get_items(user_id):
        try:
            items = session.query(Item).filter_by(user_id=user_id)
            items = [i.to_json() for i in items]
        except Exception as e:
            return flask.Response('Error getting items for user', status=500)
        return json.dumps(items), 200, {'ContentType': 'application/json'}

    # add item to user's wishlist
    # TODO
    @ app.route('/api/<user_id>/items/', methods=['POST'])
    def add_item(user_id):
        pass

    # update item info
    # TODO
    @ app.route('/api/items/<item_id>', methods=['PUT'])
    def update_item(item_id):
        pass

    # delete item
    # TODO
    @ app.route('/api/items/<item_id>', methods=['DELETE'])
    def delete_item(item_id):
        pass

    ### ERROR HANDLERS ###

    # simple error handlers

    @ app.errorhandler(werkzeug.exceptions.BadRequest)
    def handle_bad_request(e):
        return "<h1>400</h1><p>The request seems bad. If you are trying to mess around with the API, don't. Use the main site instead.</p>", 400

    @ app.errorhandler(werkzeug.exceptions.NotFound)
    def handle_not_found(e):
        return "<h1>404</h1><p>This API is not supposed to be used outside of the main site yet. Try the main site?</p>", 404

    @ app.errorhandler(werkzeug.exceptions.InternalServerError)
    def handle_internal_error(e):
        return "<h1>500</h1><p>Something went wrong.</p>", 500

    return app
