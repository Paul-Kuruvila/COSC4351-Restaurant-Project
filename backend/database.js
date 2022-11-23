const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'seatyourself',
    multipleStatements: true
});

function registerUser(username, password, request, response) { // done by Paul
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
                connection.promise().query(`INSERT INTO UserCredentials (username, password) VALUES('${username}', SHA2('${password}', 256))`);
                registered = true;
                response.status(201).send({
                    status: 'Account created. (BACKEND)',
                    registered
                });
            }
            catch(err) {
                console.log(err);
                console.log('Unexpected error occurred.');
            }
        }
        response.end();
    });
}

// Add authUser, reserveTable, etc. functions

module.exports = {
    registerUser
}