var express = require('express');
var router = express.Router();
var User=require("../models/models.js").User;
var Item=require("../models/models.js").Item;
const request = require('request');
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
router.get('/items', function(req, res, next) {
  request({
    method:'POST',
    url: 'https://niczsjpul9.execute-api.us-east-1.amazonaws.com/dev/analysis',
    body:JSON.stringify({
      "bucket": 'image-bucket-mealsplit1',
      "imageName": 'f.jpeg'
    }),
    header: {
      name: 'content-type',
      value: 'application/json'
    }
  }, function(error,response,body){

    let arr = [];
    var data = JSON.parse(body);
    var count = 0;

    for(var key of data.Labels) {

      if(key.Type === 'LINE'){

        count++;
        if(count >=7 && count <=11){
          let a = key.DetectedText.split(' ');
          let str = '';
          for(let idx of a) {
            if(isNaN(idx)) str += idx + ' ';
          }
          arr.push({name: str, price: a[a.length-1]})
        }

      }

    }
    res.json(arr);
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
