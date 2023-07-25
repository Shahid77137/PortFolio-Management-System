from pymongo import MongoClient
client = MongoClient('mongodb+srv://siddiquibabuddin202:shahidafridi@cluster0.zyhnerf.mongodb.net/?retryWrites=true&w=majority')
db = client['PROJECTJENNY']
user = db['users']
projects=db['projects']
tasks=db['tasks']
resource=db['resources']
activeUser=db['activeUser']
count=db['counter']
