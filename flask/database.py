from pymongo import MongoClient
import configparser
from bson.objectid import ObjectId


def initialize():
    config = configparser.ConfigParser()
    config.read('config.ini')
    connection_str = config['database']['mongo_connection']
    client = MongoClient(connection_str)
    global users
    global vendors

    db = client["foodster-user"]
    users = db.users
    vendors = db.vendors
    print("foodster-user database initialized")


"""
insert or update user details
"""


def upsert_user(user):
    if '_id' in user:
        print("udpating")
        users.update_one(
            {'_id': ObjectId(user['_id'])},
            {'firstName': user['firstName'],
             'lastName': user['lastName'],
             'email': user['email'],
             'password': user['password'],
             'dob': user['dob'],
             'following': user['following']}
        )

    else:
        users.insert_one({'firstName': user['firstName'],
                          'lastName': user['lastName'],
                          'email': user['email'],
                          'password': user['password'],
                          'dob': user['dob'],
                          'following': []})


def find_user(user):
    temp = users.find_one({'email': user['email']})
    if temp:
        return str(temp['_id'])
    else:
        return "failure"


# initialize()
# t = find_user({'email': 'bulmi@ramapo.edu'})
# print(t)
