# Edufy

##Summary

This is a peer to peer tutoring app, where you can sign up either as a tutor or as a student. the tutor can schedule their own free time to tutor and the student can set up a session with the tutor according to the tutor's free time.

##Installation

You will need to create a **key.js** in the same directory as server.js. In that file you will input your MySql password. The format should be the same as the following...

```
var key = {
	mysql: "INSERTPASSWORD"
};

module.exports = key;
```

After you got that set up, go into your
```
./config/config.json
```

and update the development object section to your MySql information. **LEAVE PASSWORD NULL**

Inside the
```
./db
```
you have the scema and the seed for the DB.

For the none heroku peeps. After you pull you will need to go into the ```models/index.js``` and uncomment the line 12-16.

```
var kee       = require("../key.js");
 if(env==="development"){
	 config.password = kee.mysql;
	}
```
