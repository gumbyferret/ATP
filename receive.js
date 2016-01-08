var http = require('http');
var twilio = require('twilio');
var qs = require('querystring');
// grab the user model
var Msg = require('./message');

http.createServer(function (req, res) {

  var body = '';

  req.setEncoding('utf8');

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    var data = qs.parse(body);
    var twiml = new twilio.TwimlResponse();
    var jsonString = JSON.stringify(data);
    var jsonDataObject = JSON.parse(jsonString);
    
    // create a new message
    var newMsg = Msg({
      name: jsonDataObject.From,
      message: jsonDataObject.Body,
      delete_flag: false
    });

    // save the message
    newMsg.save(function(err) {
      if (err) throw err;
      console.log('Msg created!');
    });
    
    twiml.message('Thanks, your message of ' + jsonDataObject.Body + ' was received!');
    console.log('Message from: '+jsonDataObject.From+' saying: '+jsonDataObject.Body);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

}).listen(8080);



