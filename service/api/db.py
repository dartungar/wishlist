from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

Base = declarative_base()
# pool_pre_ping for pessimistic disconnect handling
# https://docs.sqlalchemy.org/en/13/core/pooling.html#disconnect-handling-pessimistic
engine = create_engine(os.environ['DB_URL_DEV'] if os.environ['FLASK_ENV']
                       == 'development' else os.environ['DB_URL'], pool_pre_ping=True)
DBsession = sessionmaker(bind=engine)
session = DBsession()
