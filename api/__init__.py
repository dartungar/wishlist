from flask import Flask, request
from flask_cors import CORS, cross_origin
from .db import session
from .models import User, Item
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

    ### USER & AUTH ###

    # authenticate: generate JWT if user exists
    # TODO
    @app.route("/api/auth", methods=["POST"])
    def auth():
        data = request.get_json()

    # get user info
    @app.route("/api/users", methods=["GET"])
    def get_user():
        id = request.args.get("id")
        google_id = request.args.get("google_id")
        facebook_id = request.args.get("facebook_id")
        if id:
            user = session.query(User).filter_by(id=id).first()
        elif google_id:
            user = session.query(User).filter_by(google_id=google_id).first()
        elif facebook_id:
            user = session.query(User).filter_by(
                facebook_id=facebook_id).first()
        else:
            return flask.Response(status=400)
        if user:
            return user.to_json(), 200, {"ContentType": "application/json"}
        return "User not found", 404, {"ContentType": "application/json"}

    # add new user
    @app.route("/api/users", methods=["POST"])
    def add_user():
        try:
            data = request.get_json()
            new_user = User(
                name=data["name"], facebook_id=data.get("facebook_id"), google_id=data.get("google_id"))
        except Exception as e:
            return flask.Response(status=400)
        try:
            session.add(new_user)
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response(f"Error adding user: {e}", status=500)
        return "Added user!", 200, {"ContentType": "application/json"}

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
                return flask.Response("User not found", status=400)
            user.name = data.get("name")
            user.facebook_id = data.get("facebookID")
            user.google_id = data.get("googleID")
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response("Error updating user info", status=500)
        return "Updated user!", 200, {"ContentType": "application/json"}

    ### WISHLIST ITEMS ###

    # get items for specific user
    @app.route("/api/users/<user_id>/items", methods=["GET"])
    def get_items(user_id):
        try:
            items = session.query(Item).filter_by(user_id=user_id)
            items = [i.to_json() for i in items]
        except Exception as e:
            return flask.Response(str(e), status=500)
        return json.dumps(items), 200, {"ContentType": "application/json"}

    # add item
    # TODO
    @app.route("/api/items", methods=["POST"])
    def add_item():
        data = request.get_json()
        if not data or not data["user_id"]:
            return flask.Response("Invalid new item data", status=400)
        try:
            new_item = Item(user_id=data["user_id"], name=data.get("name"), price=int(data.get("price")),
                            url=data.get("url"), group_purchase=data.get("group_purchase"))
            session.add(new_item)
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response(str(e), status=500)
        return "Added item", 200, {"ContentType": "application/json"}

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
            return flask.Response(str(e), status=500)
        return "Edited item", 200, {"ContentType": "application/json"}

    # delete item
    # TODO
    @app.route("/api/items/<item_id>", methods=["DELETE"])
    def delete_item(item_id):
        item = session.query(Item).filter_by(id=item_id).first()
        if not item:
            return flask.Response("Item not found", status=400)
        try:
            session.query(Item).filter_by(id=item_id).delete()
            session.commit()
        except Exception as e:
            session.rollback()
            return flask.Response(str(e), status=500)
        return "Deleted item", 200, {"ContentType": "application/json"}

    # CORSify app so we can receive data from client on another port

    return app
