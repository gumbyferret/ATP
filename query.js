//Find All
var qs = require('querystring');
var Msg = require('./message');
//get all the users
Msg.find({}, function(err, messages) {
  if (err) throw err;
  var data = qs.parse(messages);
  var jsonString = JSON.stringify(data);
  var jsonDataObject = JSON.parse(jsonString);
  // object of all the users
  console.log(jsonString.message);
});
