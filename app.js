//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser"); //let app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url ='mongodb://localhost:27017';

const dbName = "shopDB";

const client = new MongoClient(url);

client.connect(function(err){
  assert.equal(null, err);
  console.log ("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

let items = ["Clean", "Penny", "Java"];

const app = express();



app.set('view engine', 'ejs'); // using ejs

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  // find the css files

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
    kindOfDay: day , newItem: items
  });
});

app.post("/", function(req, res){
  var item = req.body.newItem;

  items.push(item);
  console.log(item);
  res.redirect("/");
});

app.listen(3100, function() {
  console.log("Server started on port 3100.");
});
