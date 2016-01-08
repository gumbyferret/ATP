var express = require('express');
var Msg = require('./message');
var app = express();

app.get('/', function (req, res) {
    Msg.find({}, function (err, docs) {
        //var parsedJSON = JSON.parse(docs);
        //for (var i=0;i<parsedJSON.length;i++) {
        //    res.send(parsedJSON[i].message);
        //} 
        res.json(docs);
    });
});

// Start the server
app.listen(80);

//Find All

// get all the users
// Msg.find({}, function(err, messages) {
//   if (err) throw err;
//   // object of all the users
//   console.log(messages);
// });
