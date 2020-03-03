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


@app.route('/vendorlogin', methods=['POST'])
def vendor_login():
    login_data = request.form.copy()
    vendor_id = find_vendor(login_data)
    if vendor_id:
        return vendor_id
    else:
        return ("failure")


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
    data = get_wall_feed(id)
    print(jsonify(data))
    return (jsonify(data))


@app.route('/vendorsignup', methods=['POST'])
def signup_vendor():
    vendor_data = request.form.copy()
    print("vendor data recieved")
    for each in vendor_data:
        print(vendor_data[each])
    upsert_vendor(vendor_data)
    vendor_id = find_vendor(vendor_data)
    return str(vendor_id)


@app.route('/vendorwall/<id>', methods=['GET'])
def vendorwall_index(id):
    return (jsonify(dat))


@app.route('/vendorpost/<id>', methods=['GET', 'POST'])
def vedorpost_index(id):
    if request.method == 'GET':
        return "F"
    else:
        vendor_data = request.form.copy()
        print(vendor_data)
        print(id)
        add_new_post(id, vendor_data)
        return "success"


@app.route('/search', methods=['GET'])
def search_vendors():
    data = get_all_vendors()
    print(jsonify(data))
    return (jsonify(data))


app.run(debug=True)
