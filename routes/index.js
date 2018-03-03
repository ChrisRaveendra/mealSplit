var express = require('express');
var router = express.Router();
var User=require("../models/models.js").User;
var Item=require("../models/models.js").Item;
router.get('/contacts', function(req, res, next) {
  // Your code here.
  console.log(req.user._id)
  User.findById(req.user._id, function(err, results){
    console.log(results.contacts)
    var contacts= results.contacts
    console.log(contacts)
    Promise.all(contacts.map((a)=> User.findById(a).exec())).then(cList => {
      console.log(cList)
      res.send(cList);
    })
  })
});
router.post('/items', function(req, res, next) {
  // Your code here.
  var newItem= new Item({
    name:req.body.name,
    price:req.body.price
  })
  newItem.save(function(err, item) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({});
  })
});
module.exports = router;
