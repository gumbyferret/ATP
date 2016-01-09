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
      delete_flag: 'WEB'
    });

    // save the message
    newMsg.save(function(err) {
      if (err) throw err;
      console.log('Msg created!');
    });
   console.log(response);
   res.end('Thank you for your message');
});

app.get('/', function (req, res) {
    Msg.find({}, function (err, docs) {
        var arr = JSON.stringify(docs);
        var parsedJSON = JSON.parse(arr);
        var displayme = '<h1>Message Dashboard</h1>';
        for (var i=0;i<parsedJSON.length;i++) {
            console.log(parsedJSON[i].message);
            if (parsedJSON[i].delete_flag =='PHONE') {
               var htmlme = '<p>' + parsedJSON[i].delete_flag + ': ' + parsedJSON[i].message + '</p>';
            } else {
               var htmlme = '<p>' + parsedJSON[i].delete_flag + ': ' + parsedJSON[i].message + ' from: <bold>'+ parsedJSON[i].name + '</bold></p>';
            }
            displayme = displayme + htmlme;
        } 
        res.send(displayme);
        //res.docs(docs);
    });
});

// Start the server
app.listen(80);
