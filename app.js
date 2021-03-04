//jshint esversion:6

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const mongoose = require('mongoose'); // https://mongoosejs.com/docs/models.html#deleting

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

// create a database, if there isn't the database
// mongoose.connect("mongodb://localhost:27017/todolistDB",{useUnifiedTopology: true});
mongoose.connect("mongodb+srv://admin-chi:zhangchi@cluster0.8ipdb.mongodb.net/todolistDB",{useUnifiedTopology: true});
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
// const fruitSchema = new mongoose.Schema ({
//   name: {
//     type: String,
//     required: [true, 'Why no name?']
//   },
//   // data validator ,  like Excel
//   rating: {
//     type: Number,
//     min: 1,
//     max: 10
//   },
//   review: String,
//   // position: positionSchema
// });

// const Fruit = mongoose.model("Fruits", fruitSchema);
// const apple = new Fruit({
//   //name:"Apple",
//   rating: 7,
//   review:"pretty solid"
// });
//
// const banana = new Fruit({
//   name:"Banana",
//   rating: 7,
//   review:"pretty solid"
// });
//
// const kiwi = new Fruit({
//   name:"Kiwi",
//   rating: 7,
//   review:"pretty solid"
// });

// fruit.save();

// Fruit.insertMany([apple, banana, kiwi], function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("successfully saved all the fruits to fruitsDB");
//   }
// });

// Fruit.updateOne({name: "Apple"}, {name: "BigApple"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("successfully update apple");
//   }
// });
//
// Fruit.find(function(err, fruits){
//   if(err){
//     console.log(err);
//   } else{
//     //console.log(fruits);
//
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     });
//   }
// });
//

const todolistSchema = new mongoose.Schema({
  name: String
});

// let items = ["Clean", "Penny", "Java"];
const Item = mongoose.model("Item", todolistSchema);
// const item1 = new Item({
//   name:"The first item"
// });
// const item2 = new Item({
//   name:"The second item"
// });
// const item3 = new Item({
//   name:"The third item"
// });

// let items = [item1, item2, item3];

// Item.insertMany(items, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfully insert many items in database!");
//   }
// });




const express = require("express");
const bodyParser = require("body-parser"); //let app = express();

const app = express();
app.set('view engine', 'ejs'); // using ejs





app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); // find the css files

app.get("/", function(req, res) {  // frontend get from backend
  var today = new Date();
  // var day = "";
  //
  // var options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long"
  // };

  // var day = today.toLocaleDateString("en-US", options);
  Item.find({},function(err,foundItems){
    console.log("successfully found items in database, and render them on frontend");
    res.render("list", {
      kindOfDay: today,
      newItem: foundItems
    });
  });

  // res.render("list", {
  //   kindOfDay: today,
  //   // newItem: items
  //   newItem: foundItems
  // });
});

app.post("/", function(req, res) {  // frontend post to backend
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  })
  item.save();
  // items.push(item);
  console.log(item);
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("successfully delete the item");
    }
  });
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);


app.listen(port, function() {
  console.log("Server started successfully online through heroku.");
});
