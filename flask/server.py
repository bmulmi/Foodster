from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
app = Flask("__main__")
CORS(app)

user = {'username': 'hnrs499', 'password': '12345', 'id': '1'}
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
    # print(login_data)
    if checkLoginValidation(login_data):
        return user["id"]
    else:
        return ("failure")


def checkLoginValidation(data):
    print(data["username"])
    print(data["password"])
    if data["username"] == user["username"] and data["password"] == user["password"]:
        return True
    else:
        return False


@app.route('/signup', methods=['POST'])
def singup_index():
    user_data = request.form.copy()
    print("data recieved")
    for each in user_data:
        print(user_data[each])
    return("completed")


@app.route('/home/<id>', methods=['GET'])
def home_index(id):
    print("id recieved")
    print(id)
    return (jsonify(dat))


app.run(debug=True)
