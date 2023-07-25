from flask import Flask, request
from flask_cors import CORS

from service.authLog import signUp, logIn, logout, deleteUser, updateUser, readManager, isAdmin
from service.projects import createProject, asignProjectToManager, update_Project, deleteProject, displayProjects, \
    display_single_project
from service.resource import addResource, deleteResource, updateResource, showResources, asignResourceToTask, \
    show_single_resource
from service.tasks import createTask, deleteTask, updateTask, showTasks, show_single_task

app = Flask(__name__)

cors = CORS(app)

# Home Page Route
@app.route('/')
def home_page():
    return '<h1>Welcome to our portfolio Website </h1>'

# User Signup Route
@app.route('/user/signup', methods=['POST'])
def dosignUp():
    return signUp(request.get_json())

# User Login Route
@app.route('/user/login', methods=['POST'])
def doLogIn():
    return logIn(request.get_json())

# User Logout Route
@app.route('/user/logout/<email>', methods=['GET'])
def doLogOut(email):
    return logout(email)

# User Delete Route
@app.route('/user/delete/<email>', methods=['DELETE'])
def delete_user_route(email):
    return deleteUser(email)

# Check if the user is an admin Route
@app.route('/user/isadmin/<email>')
def is_admin(email):
    return isAdmin(email)

# User Update Route
@app.route('/user/update/<email>', methods=['PUT'])
def update_user_route(email):
    return updateUser(email, request.get_json())

# Get All Managers Route
@app.route('/user/managers/<email>')
def show_managers(email):
    return readManager(email)

# Project Creation Route
@app.route('/project/<email>', methods=['POST'])
def addProject(email):
    return createProject(email, request.get_json())

# Assign Project to Manager Route
@app.route('/project/<email>', methods=['PUT'])
def assignProject(email):
    return asignProjectToManager(email, request.get_json())

# Update Project Route
@app.route('/project/<email>', methods=['PATCH'])
def updateProject(email):
    return update_Project(email, request.get_json())

# Get All Projects for a Manager Route
@app.route('/project/<email>', methods=['GET'])
def allProjects(email):
    return displayProjects(email)

# Get Single Project for a Manager Route
@app.route('/project/<email>/<projectid>', methods=['GET'])
def getProject(email, projectid):
    return display_single_project(email, projectid)

# Delete Project Route
@app.route('/project/<email>/<projectid>', methods=['DELETE'])
def delete_Project(email, projectid):
    return deleteProject(email, projectid)

# Create Resource Route
@app.route('/res/<email>', methods=['POST'])
def createResource(email):
    return addResource(email, request.get_json())

# Delete Resource Route
@app.route('/res/<email>/<resid>', methods=['DELETE'])
def removeResource(email, resid):
    return deleteResource(email, resid)

# Update Resource Route
@app.route('/res/<email>/<resid>', methods=['PATCH'])
def update_Resource(email, resid):
    return updateResource(email, resid, request.get_json())

# Get All Resources for a Manager Route
@app.route('/res/<email>', methods=['GET'])
def getAllResources(email):
    return showResources(email)

# Assign Resource to Task Route
@app.route('/res/<email>/<task>/<resId>', methods=['PATCH'])
def assignResources(email, task, resId):
    return asignResourceToTask(email, task, resId)

# Get Single Resource for a Manager Route
@app.route('/res/<email>/<resid>')
def getSingleResource(email, resid):
    return show_single_resource(email, resid)

# Create Task Route
@app.route('/task/<email>/<projectid>/<task>', methods=['POST'])
def create_task(email, projectid, task):
    return createTask(email, projectid, task)

# Delete Task Route
@app.route('/task/<email>/<projectid>/<task>', methods=['DELETE'])
def delete_task(email, projectid, task):
    return deleteTask(email, projectid, task)

# Get All Tasks for a Manager Route
@app.route('/task/<email>/<projectid>', methods=['GET'])
def show_all_tasks(email, projectid):
    return showTasks(email, projectid)

# Get Single Task for a Manager Route
@app.route('/task/<email>/<projectid>/<taskid>')
def show_one_task(email, projectid, taskid):
    return show_single_task(email, projectid, taskid)

# Update Task Route
@app.route('/task/<email>/<projectId>', methods=['PUT'])
def update_task(email, projectId, task):
    return updateTask(email, projectId, task)


if __name__ == '__main__':
    app.run(debug=True, port=9000)
