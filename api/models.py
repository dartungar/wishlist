from sqlalchemy import Column, ForeignKey, String, Integer, DateTime, LargeBinary
from sqlalchemy.orm import backref, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql.sqltypes import Boolean
from uuid import uuid4
from datetime import datetime
from .db import Base, engine
import json


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    facebook_id = Column(String, unique=True, default=None)
    google_id = Column(String, unique=True, default=None)
    name = Column(String)
    public_url = Column(String, unique=True, default=None)
    items = relationship("Item", backref="users")

    def to_json(self):
        user_obj = {"id": str(self.id), "name": self.name,
                    "facebook_id": self.facebook_id, "google_id": self.google_id, "public_url": self.public_url}
        return json.dumps(user_obj)

    def to_json_short(self):
        user_obj = {"id": str(self.id), "name": self.name,
                    "public_url": self.public_url}
        return json.dumps(user_obj)


if not engine.dialect.has_table(engine, "users"):
    Base.metadata.create_all(engine)


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
                    "user_id": str(self.user_id), "price": self.price, "url": self.url, "group_purchase": self.group_purchase, "gifters": self.gifters, "date_added": str(self.date_added)}
        return json.dumps(item_obj)


if not engine.dialect.has_table(engine, "items"):
    Base.metadata.create_all(engine)
