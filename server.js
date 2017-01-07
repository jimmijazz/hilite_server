const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

var path = require('path'); // Public folder with HTML etc for express
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



var insertItem = function(db, content, callback) {
  var item = {};
  item["item_id"] = content["item_id"];
  item["text"] = content["text"];
  item["url"] = content["url"];
  item["hostname"] = content["hostname"];


  // Checks if user exists and inserts saved link
  db.collection(POSTS).update(
    { _id : content._id},
    {$push:
      { items : {
        item
        }
      }
    },
    { upsert : true },
    function(err) {
      if (err) console.log(err);
    }
  );

};

// var deleteItem = function(db, content, callback) {
//   console.log(content);
//   db.collection(POSTS).
// }

// Start webserver
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in app.
var db;


// Gets the users items
app.post('/getitems', function(req, res) {
  db.collection(POSTS).findOne({_id : req.body.id}, function(err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500)
    } else {
      console.log("results",result);
      return res.status(200).send({
        data : result
      });
    }
  });
});

// Create new item
app.post('/post', function (req, res) {
  // User saves new item
  insertItem(db, req.body, function() {
    db.close();
  });
  return res.status(200).send({
    message : "Your message has been posted"
  });
});

// Remove item
app.post('/deleteitem', function(req, res) {
  deleteItem(db, req.body, function() {
    db.close();
  });
});

app.listen(port, function() {
  console.log("Listening on Port" + port);
});
