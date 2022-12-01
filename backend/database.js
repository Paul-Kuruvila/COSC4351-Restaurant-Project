const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'seatyourself',
    multipleStatements: true
});

function registerUser(username, password, email, phoneNum, request, response) { // done by Paul
    let registered = false;
    connection.query(`SELECT * FROM UserCredentials WHERE username = '${username}'`, function(error, results, fields) {
        if(error) throw error;
        if(request.session.loggedin == true) {
            response.send({
                status: 'Already logged in. (BACKEND)'
            });
            console.log("Already logged in. (BACKEND)");
        } else if(results.length > 0) {
            response.send({
                status: 'Account name is already taken (BACKEND)'
            });
            console.log('Account name is already taken (BACKEND)');
        } else {
            try {
                // encrypt password using SHA2-256 hash function
                connection.promise().query(`INSERT INTO UserCredentials (username, password, phonenum, email) VALUES('${username}', SHA2('${password}', 256), '${phoneNum}', '${email}')`);
                registered = true;
                response.status(201).send({
                    status: 'Account created. (BACKEND)',
                    registered
                });
                console.log('Account created. (BACKEND)');
            }
            catch(err) {
                console.log(err);
                console.log('Unexpected error occurred.');
            }
        }
        response.end();
    });
}

function authUser(username, password, request, response) {
    let login;
    let SID;
    
    //Execute SQL query that'll select the account from the database based on the specified username and the password generated by the SHA2-256 hash function
    connection.query(`SELECT * FROM UserCredentials WHERE username = '${username}' AND password = SHA2('${password}', 256)`, function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (request.session.loggedin == true) {
            console.log("You are already logged in! (BACKEND)");
            return response.send({
                status: 'You are already logged in! (FROM BACKEND)',
                loginstatus: true
            });
        }
        if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.username = username;
            login = request.session.loggedin;
            SID = request.sessionID;
            response.send({
                status: 'Successfully logged in. (FROM BACKEND)',
                login,
                username
            });
            console.log("Successfully logged in.");
            console.log(`Welcome back, ${request.session.username}!`);
            response.end();
        } else {
            response.status(401).send({
                status: 'Incorrect Username and/or Password! (FROM BACKEND)',
            });
            console.log("Incorrect Username and/or Password! (BACKEND)");
        }			
        response.end();
    });
}

function reserveUser(username, name, email, phoneNum, guests, datetime, request, response) { //removed credit for now
    let reserved = false;

    connection.query(`SELECT * FROM ReservationInfo WHERE phonenum = '${phoneNum}'`, function(error, results, fields) {
        if(error) throw error;
        if(results.length > 0) {
            response.send({
                status: 'There is already a reservation under this phone number! (BACKEND)',
            });
            console.log('There is already a reservation under this phone number! (BACKEND)');
        }
        else{
           
            try {
                connection.query(`INSERT INTO ReservationInfo (name, phonenum, email, guestnum, datetime) VALUES('${name}','${phoneNum}', '${email}', '${guests}','${datetime}')`);
                reserved = true;
                response.status(201).send({
                    status: 'Info Reserved. (BACKEND)',
                    reserved
                });
                console.log('Info Reserved. (BACKEND)');
            }
            catch(error) {
                response.status(401).send({
                    status: 'Info failed to reserve. (FROM BACKEND)',
                });
                console.log(error);
                console.log('Unexpected error occurred.');
            }
        }
        response.end();
        
    });
}
 
function saveProfile(username, name, email, billaddress, diner, payment, request, response) {
    connection.query(`INSERT INTO ProfileInfo (name, phonenum, email, billaddress, diner, payment) VALUES('${name}','${phoneNum}', '${email}','${billaddress}', '${diner}', '${payment}')`, function(error, results, fields) {
        if(error) throw error;
        try {
            response.status(201).send({
                status: 'Profile info saved. (BACKEND)'
            });
            console.log('Profile info saved. (BACKEND)');
            
            
        }
        catch(error) {
            response.status(401).send({
                status: 'Profile info failed to save. (FROM BACKEND)',
            });
            console.log(error);
            console.log('Unexpected error occurred.');
        }
        response.end();
    });
}
// Add reserveTable, etc. functions

module.exports = {
    registerUser,
    authUser,
    reserveUser,
    saveProfile
}
