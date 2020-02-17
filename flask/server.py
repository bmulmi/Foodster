from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
app = Flask("__main__")
CORS(app)

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

    print(dat)
    return(jsonify(dat))


@app.route('/signup', methods=['POST'])
def singup_index():
    user_data = request.form.copy()
    print("data recieved")
    for each in user_data:
        print(user_data[each])
    return("completed")


app.run(debug=True)
