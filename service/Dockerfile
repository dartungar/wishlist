FROM python:3.9.0
WORKDIR /service
COPY . .
RUN pip install pipenv
RUN pipenv install
EXPOSE 5000
#CMD ["pipenv", "run", "gunicorn", "-b", "0.0.0.0:5000", "api:app"]
