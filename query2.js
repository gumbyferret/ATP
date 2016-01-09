var express = require('express');
var Msg = require('./message');
var app = express();

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
       name:req.query.name,
       message:req.query.message
   };
   var newMsg = Msg({
      name: req.query.name,
      message: req.query.message,
      delete_flag: false
    });

    // save the message
    newMsg.save(function(err) {
      if (err) throw err;
      console.log('Msg created!');
    });
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
