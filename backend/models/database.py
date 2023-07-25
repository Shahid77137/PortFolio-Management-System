# Import the MongoClient from the pymongo library
from pymongo import MongoClient

# Connect to the MongoDB Atlas database using the connection string
client = MongoClient('mongodb+srv://siddiquibabuddin202:shahidafridi@cluster0.zyhnerf.mongodb.net/?retryWrites=true&w=majority')

# Access the 'PROJECTPORTFOLIO' database from the connected client
db = client['PROJECTPORTFOLIO']

# Access the 'users' collection within the 'PROJECTPORTFOLIO' database
user = db['users']

# Access the 'projects' collection within the 'PROJECTPORTFOLIO' database
projects = db['projects']

# Access the 'tasks' collection within the 'PROJECTPORTFOLIO' database
tasks = db['tasks']

# Access the 'resources' collection within the 'PROJECTPORTFOLIO' database
resource = db['resources']

# Access the 'activeUser' collection within the 'PROJECTPORTFOLIO' database
activeUser = db['activeUser']

# Access the 'counter' collection within the 'PROJECTPORTFOLIO' database
count = db['counter']

