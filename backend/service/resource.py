from models.database import activeUser, resource, tasks, projects,count
from flask import jsonify
from datetime import date

if count.find_one({'name':'cc'}) is None:
    count.insert_one({'cc':1,'name':'cc'})


def addResource(email, res):

    active = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if active is None:
        return jsonify({'message': 'You are Not allowed'}), 403
    else:
        cc = count.find_one({'name': 'cc'})['cc']
        res['rid'] = str(cc)  # Use cc directly as an integer value
        count.update_one({'name': 'cc'}, {'$set': {'cc': cc + 1}})
        resource.insert_one(res)
    return jsonify({'message':"Added Successfully"}), 200


def deleteResource(email, resid):
    active = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if active is None:
        return jsonify({'message': 'You are Not allowed'}), 403
    else:
        resource.delete_one({'rid': resid})
    return jsonify({'message': "Resource has been deleted"}), 200


def updateResource(email, resid, res):
    active = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if active is None:
        return jsonify({'message': 'You are Not allowed'}), 403
    eres = resource.find({'rid': resid})
    if eres is None:
        return jsonify({'message': "Rosource not Found"}), 401
    resource.update_one({'rid': resid}, {'$set': res})
    return jsonify({'message': "Resource has been updated"}), 200
def showResources(email):
    active = activeUser.find_one({'email': email})
    if active is None:
        return jsonify({'message': 'Please Log In First'}), 403
    arr=list(resource.find())
    for r in arr:
        r['_id']=str(r['_id'])
    return jsonify(arr),200
def asignResourceToTask(email,task,resId):
    e_res = resource.find({'rid': resId})
    if e_res is None:
        return jsonify({'message': "Rosource not Found"}), 401
    exist_task = tasks.find_one({'name': task})
    if exist_task is None:
        return jsonify({'message': "Task not Found"}), 404
    existing_project = projects.find_one({"projectId": exist_task['projectId']})
    if existing_project is None:
        return jsonify({'message': "Project not Found"}), 404
    if email !=existing_project['manager']:
        return jsonify({'message': "You are not authorized"}), 403
    task['resource']=resId
    tasks.update_one({'name': task['name'], 'projectId': existing_project['projectId']},{'$set':task})
    return jsonify({'message':"Resource is assign Successfully"})
def show_single_resource(email,rid):
    active = activeUser.find_one({'email': email})
    if active is None:
        return jsonify({'message': 'Please Log In First'}), 403
    res=resource.find_one({'rid':rid})
    res['_id']=str(res['_id'])
    return jsonify(res)
