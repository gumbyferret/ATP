var express = require('express');
var Msg = require('./message');
var app = express();

app.get('/message.html', function (req, res) {
   res.sendFile( __dirname + "/" + "message.html" );
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

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
