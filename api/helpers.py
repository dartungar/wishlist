from transliterate import translit
from uuid import uuid4
import re

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
