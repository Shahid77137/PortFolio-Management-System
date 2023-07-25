from flask import Flask, request
from flask_cors import CORS

from service.authLog import signUp, logIn, logout, deleteUser, updateUser, readManager, isAdmin
from service.projects import createProject, asignProjectToManager, update_Project, deleteProject, displayProjects, \
    display_single_project
from service.resource import addResource, deleteResource, updateResource, showResources, asignResourceToTask, \
    show_single_resource
from service.tasks import createTask, deleteTask, updateTask, showTasks, show_single_task

app = Flask(__name__)

cors=CORS(app)

@app.route('/')
def home_page():
    return '<h1>Welcome to our portfolio Website </h1>'

@app.route('/user/signup',methods=['POST'])
def dosignUp(): 
    return signUp(request.get_json())


@app.route('/user/login',methods=['POST'])
def doLogIn(): 
    return logIn(request.get_json())


@app.route('/user/logout/<email>',methods=['GET'])
def doLogOut(email): 
    return logout(email)


@app.route('/user/delete/<email>',methods=['DELETE'])
def delete_user_route(email): 
    return deleteUser(email)

@app.route('/user/isadmin/<email>')
def is_admin(email): return isAdmin(email)


@app.route('/user/update/<email>',methods=['PUT'])
def update_user_route(email): 
    return updateUser(email, request.get_json())


@app.route('/user/managers/<email>')
def show_managers(email): 
    return readManager(email)


@app.route('/project/<email>', methods=['POST'])
def addProject(email): 
    return createProject(email, request.get_json())


@app.route('/project/<email>', methods=['PUT'])
def assignProject(email): 
    return asignProjectToManager(email, request.get_json())


@app.route('/project/<email>', methods=['PATCH'])
def updateProject(email): 
    return update_Project(email, request.get_json())


@app.route('/project/<email>', methods=['GET'])
def allProjects(email): 
    return displayProjects(email);


@app.route('/project/<email>/<projectid>', methods=['GET'])
def getProject(email, projectid): 
    return display_single_project(email, projectid);


@app.route('/project/<email>/<projectid>', methods=['DELETE'])
def delete_Project(email, projectid): 
    return deleteProject(email, projectid)


@app.route('/res/<email>', methods=['POST'])
def createResource(email): 
    return addResource(email, request.get_json())


@app.route('/res/<email>/<resid>', methods=['DELETE'])
def removeResource(email, resid): 
    return deleteResource(email, resid)


@app.route('/res/<email>/<resid>', methods=['PATCH'])
def update_Resource(email, resid): 
    return updateResource(email, resid, request.get_json())


@app.route('/res/<email>', methods=['GET'])
def getAllResources(email): 
    return showResources(email)


@app.route('/res/<email>/<task>/<resId>', methods=['PATCH'])
def assignResources(email, task, resId): 
    return asignResourceToTask(email, task, resId)


@app.route('/res/<email>/<resid>')
def getSingleResource(email, resid): 
    return show_single_resource(email, resid)


@app.route('/task/<email>/<projectid>/<task>', methods=['POST'])
def create_task(email, projectid, task): 
    return createTask(email, projectid, task)


@app.route('/task/<email>/<projectid>/<task>', methods=['DELETE'])
def delete_task(email, projectid, task): 
    return deleteTask(email, projectid, task)


@app.route('/task/<email>/<projectid>', methods=['GET'])
def show_all_tasks(email, projectid): 
    return showTasks(email, projectid)


@app.route('/task/<email>/<projectid>/<taskid>')
def show_one_task(email, projectid, taskid): 
    return show_single_task(email, projectid, taskid)


@app.route('/task/<email>/<projectId>',methods=['PUT'])
def update_task(email,projectId,task):
    return updateTask(email,projectId,task)


if __name__ == '__main__':
    app.run(debug=True,port=9000)