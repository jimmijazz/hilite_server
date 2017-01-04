const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

var port = process.env.PORT || 8080;

const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

//Connect to database before starting the application Server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log('Unable to connect to the database. Error:',err);
    process.exit(1);
  }
  // Save database object from the vallback for reuse
  db = database;
  console.log("database connection ready");
});


// Start webserver
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in app.
var db;

app.get('/', function(req, res) {
  res.send('Hilite App');
});

app.listen(port, function() {
  console.log("Listening on Post 3000");
});
