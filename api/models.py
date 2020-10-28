from enum import unique
from sqlalchemy import Column, ForeignKey, String, Integer, DateTime
from sqlalchemy.orm import backref, relationship
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4
from datetime import datetime
import json

from sqlalchemy.sql.sqltypes import Boolean
from .db import Base, engine


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)

    name = Column(String)
    facebook_id = Column(String, unique=True)
    google_id = Column(String, unique=True)
    items = relationship("Item", backref="users")

    def to_json(self):
        user_obj = {"id": str(self.id), "name": self.name,
                    "facebook_id": self.facebook_id, "google_id": self.google_id}
        return json.dumps(user_obj)


if not engine.dialect.has_table(engine, "users"):
    Base.metadata.create_all(engine)


class Item(Base):
    __tablename__ = "items"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = Column(String)
    url = Column(String)
    price = Column(Integer)
    group_purchase = Column(Boolean)
    gifters = Column(String)
    date_added = Column(DateTime, default=datetime.now())

    def to_json(self):
        item_obj = {"id": str(self.id), "name": self.name,
                    "user_id": str(self.user_id), "price": self.price, "url": self.url, "group_purchase": self.group_purchase, "gifters": str(self.gifters), "date_added": str(self.date_added)}
        return json.dumps(item_obj)


if not engine.dialect.has_table(engine, "items"):
    Base.metadata.create_all(engine)
