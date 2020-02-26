from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
from database import *

app = Flask("__main__")
CORS(app)
initialize()

user = {'email': 'hnrs499', 'password': '12345', 'id': '1'}
dat = [
    {
        'id': 1,
        'name': 'Chinese Restaurant',
        'location': 'Queens',
        'description': 'A local chinese restaurant in Queens'
    },
    {
        'id': 2,
        'name': 'Italian',
        'location': 'NYC',
        'description': 'A local Italian restaurant in Manhattan'
    },
    {
        'id': 3,
        'name': 'Vietnamese',
        'location': 'Mahwah',
        'description': 'A local Vietnamese restaurant in Mahwah'
    }
]


@app.route('/')
def index():
    print("works!")
    return("server running!")


@app.route('/login', methods=['POST'])
def login_index():
    login_data = request.form.copy()
    user_id = find_user(login_data)
    if user_id:
        return user_id
    else:
        return ("failure")


def checkLoginValidation(data):
    if data["email"] == user["username"] and data["password"] == user["password"]:
        return True
    else:
        return False


@app.route('/signup', methods=['POST'])
def signup_index():
    user_data = request.form.copy()
    print("data recieved")
    for each in user_data:
        print(user_data[each])
    upsert_user(user_data)
    user_id = find_user(user_data)
    return str(user_id)


@app.route('/home/<id>', methods=['GET'])
def home_index(id):
    print("id recieved")
    # use this id to get the user's {following} list
    # use that list to get the posts from the vendors
    print(id)
    return (jsonify(dat))


@app.route('/vendorwall/<id>', methods=['GET'])
def vendorwall_index(id):
    return (jsonify(dat))


@app.route('/vendorpost/<id>', methods=['GET', 'POST'])
def vedorpost_index(id):
    if request.method == 'GET':
        return "F"
    else:
        userdat = request.form.copy()
        print(userdat)
        return "G"


app.run(debug=True)
