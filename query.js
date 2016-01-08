//Find All
var Msg = require('./message');
//get all the users
Msg.find({}, function(err, messages) {
  if (err) throw err;

  // object of all the users
  console.log(messages);
});
