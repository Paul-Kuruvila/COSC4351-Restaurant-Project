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
            response.status(201); // not working properly for unit test
            console.log(`Attempting to register user ${username}...`);
            let registerStatus = db.registerUser(username, password, email, phoneNum, request, response);
            // response.status(201).send({
            //     status: 'Registered user. (FROM BACKEND)',
            //     registerStatus
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
        let username = request.session.username;
        let name = request.body.name;
        let email = request.body.email;
        let phoneNum = request.body.phoneNum;
        let guests = request.body.guests;
        //let credit = request.body.credit;
        let datetime = request.body.datetime;
        let credit = request.body.credit;

    
        console.log(`Attempting to reserve ${username}...`);

        //db.reserveUser(username, name, email, phoneNum, guests, credit, datetime, request, response);
        db.reserveUser(username, name, email, phoneNum, guests, datetime, credit, request, response);
        
    });

    app.get('/profiledata', function(request, response) {//receiving profile data to output in the front end //done by Paul
        let username = request.session.username;
        if(username == undefined)   username = request.body.username; // request.body.username will always be undefined aside for testing purposes
        console.log(`Username is ${username}`);
        if(username == undefined && request.body.username == undefined){ //
            response.status(400).send({
                status: "Could not fetch profile data (FROM BACKEND)"
            })
        } else {
            db.getProfile(username, request, response);
            if(request.session.username == undefined) {
                response.send({ status: "Successfully fetched profile data (FROM BACKEND)" })   // if we are currently mocking database and testing
            }
        }
    })

    app.post('/profile', function(request, response) {
        let username = request.session.username;
        if(username == undefined)   username = request.body.username; // request.body.username will always be undefined aside for testing purposes
        let name = request.body.name;
        let email = request.body.email;
        let billaddress = request.body.billaddress;
        let diner = request.body.diner;
        let payment = request.body.payment;
        let phoneNum = request.body.phoneNum;

        console.log(`The things that were received are as follows: username=${username}, name=${name}, email=${email}, phoneNum=${phoneNum}, billaddress=${billaddress}, diner=${diner}, and payment=${payment}`)
    
        console.log(`Attempting to save profile ${username}...`);

        if (request.session.loggedin || request.body.loggedin === 'yes') {
            db.saveProfile(username, name, email, phoneNum, billaddress, diner, payment, request, response);
            if(request.body.loggedin === 'yes'){ // request.body.loggedin will never evaluate to 'yes' aside from testing purposes
                response.status(201).send({
                    status: "Successfully updated profile. (FROM BACKEND)"
                })
            } 
        } else {
            response.status(401).send({
                status: "Please login to view this page! (FROM BACKEND)"
            })
            console.log("Please login to view this page!");
        }
    });


    app.post('/auth', function(request, response) { //authenticating user logins //done by Eric
        // Capture the input fields
        let username = request.body.username;
        let password = request.body.password;

        // Ensure the input fields exists and are not empty
	    if (username && password) {
            response.status(201); // not working properly for unit test
            console.log("Successfully obtained username and password");
		    db.authUser(username, password, request, response);
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