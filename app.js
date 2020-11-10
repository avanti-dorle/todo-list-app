//import all the libraries

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.use('/',homeRoute);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
