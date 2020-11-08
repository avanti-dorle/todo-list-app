//import all the libraries

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const homeRoute = require('./routes/homeRoute');

const app = express();
const port = 3000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoDB'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("Connected to database successfully!");
});

global.db = db; //global scope, can use db globally, no need to open and close connection everytime 

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use('/',homeRoute);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});