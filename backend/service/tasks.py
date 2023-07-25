from models.database import user, activeUser, tasks, projects
from flask import jsonify
from datetime import date


# Function to create a new task within a project
def createTask(email, projectid, task):
    project = projects.find_one({"projectId": projectid})
    # Update the status of the project to 'In Progress'
    project["status"] = 'In Progress'
    projects.update_one({"projectId": projectid}, project)

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403
    exist_task = tasks.find_one({'name': task['name'], 'projectId': projectid})
    if exist_task is not None:
        return jsonify({'message': 'Task with this name already exists in this Project'}), 301

    task['projectId'] = projectid
    task['status'] = 'to do'
    task['createDate'] = str(date.today())
    tasks.insert_one(task)

    return jsonify(task), 200

# Function to delete a task from a project
def deleteTask(email, projectid, taskName):
    project = projects.find_one({"projectId": projectid})
    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403
    exist_task = tasks.find_one({'name': taskName, 'projectId': projectid})
    if exist_task is None:
        return jsonify({'message': 'Task Not Found'}), 302
    tasks.delete_one({'name': taskName, 'projectId': projectid})
    return jsonify({'message': 'Task Deleted Successfully'}), 200

# Function to update a task within a project
def updateTask(email, projectid, task):
    project = projects.find_one({"projectId": projectid})
    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403
    exist_task = tasks.find_one({'name': task['name'], 'projectId': projectid})
    if exist_task is None:
        return jsonify({'message': 'Task Not Found'}), 302
    tasks.update_one({'name': task['name'], 'projectId': projectid}, {'$set': task})
    return jsonify({'message': 'Task is Updated Successfully'}), 200

# Function to retrieve a list of all tasks within a project
def showTasks(email, projectid):
    project = projects.find_one({"projectId": projectid})
    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403
    arr = list(tasks.find({'projectId': projectid}))
    for tk in arr:
        tk['_id'] = str(tk['_id'])
    return jsonify(arr), 200

# Function to retrieve details of a single task within a project
def show_single_task(email, projectid, taskid):
    project = projects.find_one({"projectId": projectid})
    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403
    tk = tasks.find_one({'projectId': projectid, 'name': taskid})
    tk['_id'] = str(tk['_id'])
    return jsonify(tk), 200
