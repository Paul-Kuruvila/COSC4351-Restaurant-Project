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
                console.log('Account created. (BACKEND)');
            }
            catch(err) {
                console.log(err);
                console.log('Unexpected error occurred.');
            }
        }
        return registered;
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
        } else {
            response.status(401).send({
                status: 'Incorrect Username and/or Password! (FROM BACKEND)',
            });
            console.log("Incorrect Username and/or Password! (BACKEND)");
        }
    });
}

function reserveUser(username, name, email, phoneNum, guests, datetime, request, response) { //removed credit for now
    let login = request.session.loggedin;
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
                connection.query(
                    `INSERT INTO ReservationInfo (userid, name, phonenum, email, guestnum, datetime) 
                    VALUES((SELECT userid FROM UserCredentials WHERE username = '${username}'), 
                    '${name}','${phoneNum}', '${email}', '${guests}','${datetime}')`
                );
                reserved = true;
                response.status(201).send({
                    status: 'Info Reserved. (BACKEND)',
                    reserved,
                    login
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

function getProfile(username, request, response){
    if (request.session.loggedin || request.body.loggedin === 'yes') { // request.body.loggedin will never evaluate to 'yes' aside from testing purposes
        console.log(`Attempting to retrieve stored information for ${username}...`);
        connection.query(`SELECT name, email, billaddress, diner, payment FROM ProfileInfo WHERE (SELECT userid FROM UserCredentials WHERE username = '${username}') = ProfileInfo.userid`, (err, results) => {
            if (err) throw err;

            var data;
            data = results[0];
            response.send(data);
            console.log(data);
        });
    } else {
        response.status(401).send({
            status: "Please login to view this page! (FROM BACKEND)"
        })
        console.log("Please login to view this page!");
    }
}
 
function saveProfile(username, name, email, phoneNum, billaddress, diner, payment, request, response) {
    let login = request.session.loggedin;
    let savedInfo = false;

    try {
        connection.promise().query(
            `INSERT INTO ProfileInfo (userid, name, phonenum, email, billaddress, diner, payment)  
            VALUES((SELECT userid FROM UserCredentials WHERE username = '${username}'), 
            '${name}','${phoneNum}', '${email}', '${billaddress}', '${diner}', '${payment}') ON DUPLICATE KEY
            UPDATE name='${name}', phonenum='${phoneNum}', email='${email}', billaddress='${billaddress}', diner='${diner}', payment='${payment}'`
        );
        savedInfo = true;
        //testprof(savedInfo);
        response.status(201).send({
            status: 'Information saved.', 
            login,
            savedInfo
        });
        console.log("Information saved.");
    }
    catch(err){
        console.log(err);
        console.log("Information was not saved.");
    }
}

// connection.end();

module.exports = {
    registerUser,
    authUser,
    reserveUser,
    saveProfile,
    getProfile
}
