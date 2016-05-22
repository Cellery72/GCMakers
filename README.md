# Makers Website
##ToDo 1: npm install
##ToDo 2: bower install in app folder
##ToDo 3: create folder for db to be stored
* For Mac: mkdir -p api/data/db/
* For Windows: md -p .\api/data/db

##ToDo 4: run DB in that folder
* For Mac: mongod --dbpath api\data\db
* For Windows: mongodbPath\bin\mongod.exe --dbpath .\api\data\db 
	* Where mongodbPath is the path of your MongoDb folder
	
##ToDo 5: nodemon api/server.js