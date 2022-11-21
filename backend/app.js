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

    app.post('/register', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;

        if(username && password) {
            console.log(`Attempting to register user ${username}...`);
            db.registerUser(username, password, request, response);
            response.send({
                status: 'Registered user. (BACKEND)'
            });
        } else {
            response.status(400).send({
                status: 'Please enter username and password! (BACKEND)'
            });
            console.log('Please enter username and password (BACKEND)');
            response.end();
        }
    });

    return app;
}

module.exports = express_app;