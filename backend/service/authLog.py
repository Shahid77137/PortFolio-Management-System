from models.database import user, activeUser
from flask import jsonify
from datetime import date

userCount = 1


def createUser(firstName, lastName, role, about, email, password):
    global userCount
    return {
        'id': userCount,
        'firstName': firstName,
        'lastName': lastName,
        'role': role,
        'isActive': True,
        'startDate': str(date.today()),
        'about': about,
        'email': email,
        'password': password
    }


def signUp(response):
    email = response.get('user')['email']
    existing_user = user.find_one({'email': email})
    global userCount
    if existing_user is not None:
        return jsonify({"message": "User with this email already exists"}), 400

    if response.get('user')["role"] == 'ADMIN' and response.get('secretKey') == 'Jenny':
        obj = response.get('user')
        user.insert_one(
            createUser(obj['firstName'], obj['lastName'], obj['role'], obj['about'], obj['email'], obj['password']))

        userCount = userCount + 1
    elif response.get('user')["role"] == 'ADMIN' and response.get('secretKey') != 'Jenny':
        return jsonify({"message": "This secret key is not valid"}), 400
    else:
        obj = response.get('user')
        obj["role"] = "Manager"
        obj['startDate']=str(date.today())
        user.insert_one(
            createUser(obj['firstName'], obj['lastName'], obj['role'], obj['about'], obj['email'], obj['password']))

        userCount = userCount + 1
    return jsonify(response.get('user')), 200


def logIn(request):
    email = request.get("email")
    password = request.get("password")
    activeUseri = activeUser.find_one({'email': email})
    if activeUseri is not None:
        return jsonify({"message": "You are already logged in"}), 403
    existing_user = user.find_one({'email': email})
    if existing_user is None:
        return jsonify({"message": "No user found with this email"}), 404
    else:
        if existing_user["password"] == password:
            activeUser.insert_one({"email": existing_user["email"], "role": existing_user["role"]})
            return jsonify({"message": "Logged In SuccessFully"}), 200
        else:
            return jsonify({"message": "credentials not valid"}), 401


def logout(email):
    # user=activeUser.find_one({"email":email})
    activeUser.delete_one({"email": email})
    return jsonify({"message": "You have Logged Out Successfully"}), 200


def deleteUser(email):

    existing_user = user.find_one({'email': email})
    if existing_user is None:
        return jsonify({'message':"User Not found"}),301
    user.delete_one({'email': email})
    activeUser.delete_one({'email': email})
    return jsonify({'isDone': True}), 200



def updateUser(email, request):
    user.update_one({'email': email}, {'$set': request})
    return jsonify({'isUpdate': True}), 200



def readManager(email):
    activeUseri = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUseri is None:
        return jsonify({'message': "You have to Log In First"}), 403
    managers = list(user.find({'role': 'Manager'}))
    for manager in managers:
        manager['_id']=str(manager['_id'])
    return jsonify(managers), 201
def isAdmin(email):
    active_User=activeUser.find_one({'email':email,"role":"ADMIN"})
    if activeUser is None:
        return jsonify({'message':"I m Admin"}),200
    else:
        return jsonify({'message':"I m not Admin"}),201

