Synthergize
===========

Blending scotch.io's Easy Node Auth 1 and MEAN Stack SPA
- [Easy Node Authentication: Setup and Local](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local)
- [Setting Up a MEAN Stack Single Page Application](http://scotch.io/bar-talk/setting-up-a-mean-stack-single-page-application)
  
### Installation

**Prerequisites**

Install Homebrew, Node.js, Bower, Nodemon
```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install node
$ npm install -g bower
$ npm install -g nodemon
```

Install PostgreSQL 
- Mac  
  - [Postgres.app](http://postgresapp.com/) (PG server) + [add CLI tools](http://postgresapp.com/documentation/cli-tools.html)
  - [PG Commander](https://eggerapps.at/pgcommander/) (GUI client)  
- Other
  - [Postgres downloads](http://www.postgresql.org/download/) (various OS options)  

**Local**

Clone git repo, setup db, install node/bower packages
```
$ git clone https://github.com/alexburner/synthergize.git
$ cd synthergize
$ ./scripts/dbconfig.sh
$ npm install
$ bower install
```

Setup PostgreSQL
- Follow instructions at http://postgresguide.com/setup/users.html
  - Add a user name "root" password "root"
  - Create database named "learntogether"
  - Hook user up with database

- If you have a pre-existing PostgreSQL database named "learntogether" run the tear down script first `./scripts/dbteardown.sh`, then run the build script: `./scripts/dbconfig.sh`
-
### Run

From project folder
```
$ nodemon server.js
```


Needs:
=====
* Sequelize controls schema: bad! **Fixed! 
* Passport config is weird
* Config in general is weird
* Need config envs: dev, test, prod
