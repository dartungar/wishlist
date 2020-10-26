from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

Base = declarative_base()
engine = create_engine(os.environ['DB_URL'])
DBsession = sessionmaker(bind=engine)
session = DBsession()
