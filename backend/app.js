const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

function express_app(db) {  // export as function so that it can receive any specified database as a parameter, which will be utilized for database mocking 
    const app = express();
    app.use(cors());

    app.use(session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {secure: false}
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'static')));

    //the above setup by Eric

    app.get('/', function(request, response) {
        response.status(200).send('Home page successfully loaded.');
    });

    app.get('/loginstatus', (request, response) => {
        let username = request.session.username;
        let login = false;
        if(username != null) 
            login = true;
        response.send([username, login]);
    });

    app.post('/logout', function(request, response, next) { //force logout of user //done by Eric
        request.session.loggedin = false;
        let SID = request.sessionID;
        let login = request.session.loggedin;
        request.session.destroy();
        response.send({
            status: "Successfully logged out (FROM BACKEND)",
            login
        })
        console.log("Successfully logged out (BACKEND)");
        response.end();
    });

    app.post('/register', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        let email = request.body.email;
        let phoneNum = request.body.phoneNum;

        if(username && password) {
            console.log(`Attempting to register user ${username}...`);
            db.registerUser(username, password, email, phoneNum, request, response);
            // response.send({
            //     status: 'Registered user. (BACKEND)'
            // });
        } else {
            response.status(400).send({
                status: 'Please enter username and password! (FROM BACKEND)'
            });
            console.log('Please enter username and password (BACKEND)');
            response.end();
        }
    });

    app.post('/reserve', function(request, response) {
        let username = request.body.username;
        let name = request.body.name;
        let email = request.body.email;
        let phoneNum = request.body.phoneNum;
        let guests = request.body.guests;
        let credit = request.body.credit;
        let datetime = request.body.datetime;

    
        console.log(`Attempting to reserve ${username}...`);

        db.reserveUser(username, name, email, phoneNum, guests, credit, datetime, request, response);
        // response.send({
        //     status: 'Registered user. (BACKEND)'
        // });

        response.end();
        
    });


    app.post('/auth', function(request, response) { //authenticating user logins //done by Eric
        // Capture the input fields
        let username = request.body.username;
        let password = request.body.password;

        // Ensure the input fields exists and are not empty
	    if (username && password) {
            console.log("Successfully obtained username and password");
		    db.authUser(username, password, request, response);
            // response.send({              // Causing this error: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            //     status: 'Successfully obtained username and password (FROM BACKEND)'
            // })
        } else {
            response.status(401).send({
                status: 'Please enter Username and Password! (FROM BACKEND)'
            });
            console.log("Please enter Username and Password! (BACKEND)");
            response.end();
        }
    });
    
    return app;
}

module.exports = express_app;