//jshint esversion:6

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017';
// const dbName = "shopDB";
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   insertDocuments(db,function(){
//     client.close();
//   })
// });
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useUnifiedTopology: true});

// const insertDocuments = function(db, callback) {
//   const collection = db.collection('fruits');
//   collection.insertMany([{
//       name : "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name : "Orange",
//       score: 9,
//       review: "dilicious"
//     },
//      {
//       name : "Banana",
//       score: 7,
//       review: "very good"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruits", fruitSchema);
const apple = new Fruit({
  name:"Apple",
  rating: 7,
  review:"pretty solid"
});

const banana = new Fruit({
  name:"Banana",
  rating: 7,
  review:"pretty solid"
});

const kiwi = new Fruit({
  name:"Kiwi",
  rating: 7,
  review:"pretty solid"
});

// fruit.save();
Fruit.insertMany([apple, banana, kiwi], function(err){
  if(err){
    console.log(err);
  } else{
    console.log("successfully saved all the fruits to fruitsDB");
  }
});



const express = require("express");
const bodyParser = require("body-parser"); //let app = express();

const app = express();
app.set('view engine', 'ejs'); // using ejs

let items = ["Clean", "Penny", "Java"];



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); // find the css files

app.get("/", function(req, res) {
  var today = new Date();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    kindOfDay: day,
    newItem: items
  });
});

app.post("/", function(req, res) {
  var item = req.body.newItem;

  items.push(item);
  console.log(item);
  res.redirect("/");
});

app.listen(3100, function() {
  console.log("Server started on port 3100.");
});
