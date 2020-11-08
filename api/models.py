from sqlalchemy import Column, ForeignKey, String, Integer, DateTime, Date
from sqlalchemy.orm import backref, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql.schema import Table
from sqlalchemy.sql.sqltypes import Boolean
from uuid import uuid4
from datetime import datetime
from .db import Base, engine
import json


# user - user many to many association
# to implement Favorite users
# https://docs.sqlalchemy.org/en/13/orm/basic_relationships.html#many-to-many
favorite_users_association = Table('favorite_users', Base.metadata, Column('owner_id', UUID(
    as_uuid=True), ForeignKey('users.id')), Column('person_id', UUID(as_uuid=True), ForeignKey('users.id')))


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    facebook_id = Column(String, unique=True, default=None)
    google_id = Column(String, unique=True, default=None)
    name = Column(String)
    birthday = Column(Date)
    public_url = Column(String, unique=True, default=None)
    items = relationship("Item", backref="users")
    favorite_persons = relationship(
        "User", secondary=favorite_users_association, primaryjoin=favorite_users_association.c.owner_id == id, secondaryjoin=favorite_users_association.c.person_id == id,
        backref='parents'
    )

    def to_json(self):
        user_obj = {"id": str(self.id), "name": self.name, "birthday": str(self.birthday),
                    "facebook_id": self.facebook_id, "google_id": self.google_id, "public_url": self.public_url}
        return json.dumps(user_obj)

    def to_json_short(self):
        user_obj = {"id": str(self.id), "name": self.name, "birthday": str(self.birthday),
                    "public_url": self.public_url}
        return json.dumps(user_obj)


# if not engine.dialect.has_table(engine, "users"):
#     Base.metadata.create_all(engine)


class Item(Base):
    __tablename__ = "items"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey(
        "users.id"), nullable=False)
    name = Column(String)
    url = Column(String)
    price = Column(Integer)
    group_purchase = Column(Boolean, default=False)
    gifters = Column(String)
    date_added = Column(DateTime, default=datetime.now())

    def to_json(self):
        item_obj = {"id": str(self.id), "name": self.name,
                    "user_id": str(self.user_id), "price": self.price, "url": self.url, "group_purchase": self.group_purchase, "gifters": self.gifters if self.gifters else None, "date_added": str(self.date_added)}
        return json.dumps(item_obj)


# if not engine.dialect.has_table(engine, "items"):
#     Base.metadata.create_all(engine)

Base.metadata.create_all(engine)
