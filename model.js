var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ratio: {   //for items that are shared
    type: Number,
  }
});
var mealSchema = mongoose.Schema({   //think of each meal model as a transaction
  items: {        //array of item _ids
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  master:{
    type: String,   //Master's user _id
    required: true
  },
  eater: {
    type: String, //Eater's user _id
    required: true
  },
  paid: {   //User's status on payment
    type: Boolean,
    required: true
  }
});
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  balance: {
    type: Number
  },
  meals:{  //transactions Array of meal id's
    type: Array
  }
});

var Item = mongoose.model("Item", itemSchema);
var Meal = mongoose.model("Meal", mealSchema);
var User = mongoose.model("User", userSchema);
module.exports={
  Meal: Meal,
  Item: Item,
  User: User
};
