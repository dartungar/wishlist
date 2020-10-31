from hashlib import sha256
from transliterate import translit
from uuid import uuid4
from cryptography.fernet import Fernet
import re
import os


# slugify user's name, transliterate if needed,
# and add bit of random ID to keep it unique
def generate_public_url(name):
    if re.match(r"[а-яА-Я]", name):
        name = translit(name, reversed=True)
    name_split = name.lower().split()
    name_formatted = ("-").join(name_split)
    short_id = str(uuid4()).split("-")[1]
    public_url = ("-").join([name_formatted, short_id])
    return public_url


def create_hash(data):
    if data:
        hash = sha256(str.encode(data)).hexdigest()
        return hash
    return None


def encrypt(data):
    if data:
        f = Fernet(os.getenv('SECRET'))
        return bytes.decode(f.encrypt(str.encode(data)))
    return None


def decrypt(data):
    if data:
        f = Fernet(os.getenv('SECRET'))
        return bytes.decode(f.decrypt(str.encode(data)))
    return None
