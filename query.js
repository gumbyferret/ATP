var express = require('express');
var Msg = require('./message');
var app = express();

app.get('/', function (req, res) {
    Msg.find({}, function (err, docs) {
        var arr = JSON.stringify(docs);
        var parsedJSON = JSON.parse(arr);
        var displayme = ' ';
        for (var i=0;i<parsedJSON.length;i++) {
            console.log(parsedJSON[i].message);
            var htmlme = '<p>' + parsedJSON[i].message + '</p>'
            displayme = displayme + htmlme;
        } 
        res.send(displayme);
        //res.docs(docs);
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
