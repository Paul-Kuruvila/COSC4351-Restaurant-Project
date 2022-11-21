createApp = require('./app.js');
database = require('./database.js');
const app = createApp(database); // setup for database mocking
const port = 5000;

app.listen(port, () => {console.log(`Server started on port ${port}`)});