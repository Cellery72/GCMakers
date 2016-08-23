![Georgian College Logo](http://cdn.agilitycms.com/dine-on-campus/Georgian/HomeTheme/Logo2014.jpg "Georgian College")
# GC Makers Web Application
<<<<<<< HEAD

### Version 0.0.2
=======
#### Version 0.0.2
>>>>>>> Development
------------------------------------------------------------------------
The Georgian College Makers club is a group of like minded students interested in making **'cool' stuff**. That term is purposely vague - whether it be the newest technological advancement in a developing industry, a simple desktop application, or perhaps a 3D printed robotic arm.. the Makers are interested!
> This repository is a WIP (work in progress) and contains the most recent and ongoing changes to the application. If you don't like **risk, instability, or even uncertainty** don't use our WIP application.



### Branches and the Development Process
------
#### Ongoing Branches

  ><a href="https://github.com/Cellery72/GCMakers/tree/Development">**origin/Development**<a/>
  >- Most active branch and the **only one that accepts Pull Requests**.

  ><a href="https://github.com/Cellery72/GCMakers/tree/Testing">**origin/Testing**<a/>
  >- This is the UAT (User Acceptance Testing) branch to handle ongoing testing to the system, this branch is hosted on the development server.

  ><a href="https://github.com/Cellery72/GCMakers/tree/master">**origin/master**<a/> 
  >- Public branch, this is the live copy of the web application running in production.


#### Developement


**If you'd like to contribute, follow the instructions below**

*GC Makers requires [Node.js](https://nodejs.org/) v4+ and [MongoDB](https://www.mongodb.com/) to run.*
*We assume MongoDB is created with a default location of *


1. **Clone** the repository if you simply wish to run the application locally.. **OR** if you wish to make changes and would like to submit them to this repository, make your own personal **Fork**
2. Open a terminal/CMD at the root of the project, run the command below:
   - `` $ npm install ``
3. Make directory for the db under ~/GCMakers/api/data/db
4. Start mongod in the appropriate folder
   - On Mac: ``$ mongod --dbpath api\data\db``
   - On Windows: ``C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe --dbpath ~\GCMakers\api\data\db``
5. Open a Terminal/CMD at the root of the project, run start command:
`` $ sudo npm start``


### License
----

MIT
