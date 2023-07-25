from models.database import user, activeUser, projects
from flask import jsonify
from datetime import date

# Function to create a new project and add it to the database
def createProject(email, project):
    existing_project = projects.find_one({"projectId": project['projectId']})
    if existing_project is not None:
        return jsonify({"message": "Project with same Id already Present"}), 301

    project["startDate"] = str(date.today())
    current_active_user = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if current_active_user is None:
        return jsonify({'message': 'You are not authorized to create a project'}), 403
    
    # Set the initial status of the project to 'to do'
    project["status"] = 'to do'
    
    # Insert the project into the database and return the response
    projects.insert_one(project)
    project['_id'] = str(project['_id'])
    return jsonify(project), 201

# Function to assign a project to a manager
def assignProjectToManager(adminEmail, request):
    managerEmail = request.get('managerEmail')
    projectid = request.get('projectid')
    existing_project = projects.find_one({"projectId": projectid})
    if existing_project is None:
        return jsonify({'message': "Project not found"}), 301
    
    current_active_user = activeUser.find_one({'email': adminEmail, 'role': 'ADMIN'})
    if current_active_user is None:
        return jsonify({'message': 'You are not authorized to assign a project'}), 403

    manager = user.find_one({'email': managerEmail, 'role': 'Manager'})
    if manager is None:
        return jsonify({'message': 'Manager not found'}), 404
    
    # Update the project in the database with the assigned manager's email
    projects.update_one({"projectId": projectid}, {'$set': {'manager': managerEmail}})
    return jsonify({'message': "Project is Assigned Successfully"}), 200

# Function to update an existing project in the database
def update_Project(adminEmail, request):
    project = request
    current_active_user = activeUser.find_one({'email': adminEmail, 'role': 'ADMIN'})
    if current_active_user is None:
        return jsonify({'message': 'You are not authorized to update a project'}), 403

    oldname = project.pop('old_projectId')
    if oldname != project['projectId']:
        existing_project = projects.find_one({"projectId": project['projectId']})
        if existing_project is not None:
            return jsonify({"message": "Project with same Id already Present"}), 301
    
    # Update the project in the database with the new details
    projects.update_one({"projectId": oldname}, {'$set': project})
    return jsonify({'message': "Project is Updated Successfully"}), 200

# Function to delete a project from the database
def deleteProject(email, projectid):
    project = projects.find_one({'projectId': projectid})
    if project is None:
        return jsonify({'message': 'Project not found'}), 301

    current_active_user = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if current_active_user is None:
        return jsonify({'message': 'You are not authorized to delete a project'}), 403
    
    # Delete the project from the database
    projects.delete_one({'projectId': projectid})
    return jsonify({'message': "Project is Deleted Successfully"}), 200

# Function to display all projects for an admin user or projects assigned to a manager
def displayProjects(email):
    my_user = activeUser.find_one({'email': email})
    if my_user["role"] == 'ADMIN':
        arr = list(projects.find())
    else:
        arr = list(projects.find({'manager': email}))

    # Convert ObjectIds to strings for JSON serialization
    for pr in arr:
        pr['_id'] = str(pr['_id'])

    return jsonify(arr), 200

# Function to display a single project based on the project id
def display_single_project(email, projectid):
    project = projects.find_one({'projectId': projectid})
    if project is None:
        return jsonify({'message': 'Project not found'}), 301

    current_active_user = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    project['_id'] = str(project['_id'])
    if current_active_user is None:
        current_active_user2 = activeUser.find_one({'email': email})
        if current_active_user2 is None:
            return jsonify({'message': 'You are not authorized to access this project'}), 403
        else:
            if project['manager'] == current_active_user2['email']:
                return jsonify(project), 200
            else:
                return jsonify({'message': 'You are not authorized to access this project'}), 403

    return jsonify(project), 200
