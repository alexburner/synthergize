synthergize
===========

blending scotch.io's Easy Node Auth 1 and MEAN Stack SPA
- [Easy Node Authentication: Setup and Local](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local)
- [Setting Up a MEAN Stack Single Page Application](http://scotch.io/bar-talk/setting-up-a-mean-stack-single-page-application)
  
Postgres  
Add a user  name "root" password "root"  
Create database named "synthergizedb"  
http://postgresguide.com/setup/users.html

this can be accomplished by running
```
./scripts/dbconfig.sh
```

Needs:
=====
* Sequelize controls schema: bad!
* Passport config is weird
* Config in general is weird
* Need config envs: dev, test, prod
