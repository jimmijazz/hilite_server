const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

var port = process.env.PORT || 8080;

const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

var POSTS = "posts";

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

// var insertPost = function(db, content, callback) {
//   // Check if userID currently exists
//   db.collection(POSTS).findOne({_id : db._id}, function(err, result){
//     if (err) {
//       console.log(err);
//     } else if (!result) { // User does not exist
//         db.collection(POSTS).insertOne(content, function(err, results) {
//           if (err) console.log(err);
//         });
//     } else if (result) {
//         console.log("user exists")
//         db.collection(POSTS).insertOne(content, function(err, results) {
//
//         });
//       };
//   });
// };

var insertPost = function(db, content, callback) {

  db.collection(POSTS).update(
    { _id : content._id},
    { items : content },
    { upsert : true },
    function(err) {
      if (err) console.log(err);
    }
  );

};



// Start webserver
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in app.
var db;

app.get('/', function(req, res) {
  res.send('Hilite App');
});

app.post('/post', function (req, res) {
  insertPost(db, req.body, function() {
    db.close();
  });
  return res.status(200).send({
    message : "Your message has been posted"
  });
});


app.listen(port, function() {
  console.log("Listening on Port" + port);
});
