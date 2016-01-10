var notifier = require('mail-notifier')
// var Msg = require('./message')
var fs = require('fs')
var stream = require('stream');

var filename = __dirname + "/config.json";
var config = JSON.parse (fs.readFileSync(filename,'utf8'));

var imap = {
        user: config.username,
        password: config.password,
        host: config.imap.host,
        port: config.imap.port,
        tls: true,// use secure connection
        tlsOptions: { rejectUnauthorized: false }
};

//---------------------------------------------------------------------------------------------------------
// Mail Processor  mail receive event
//---------------------------------------------------------------------------------------------------------
var mailProcessor  = notifier(imap).on('mail', function (mail) {

    //Build a custom json email message from "mail" object.
    //mail has lot of other properties, please use it as per your requirement.
    var msg = {};
    msg.date = mail.date;
    msg.plaintextbody = mail.text;
    msg.subject = mail.subject;
    msg.to = JSON.stringify(mail.to);
    msg.id = mail.messageId;
    msg.from = JSON.stringify(mail.from);

    var newMsg = Msg({
      name: msg.from,
      message: msg.plaintextbody,
      delete_flag: 'EMAIL'
    });

    // save the message
    newMsg.save(function(err) {
      if (err) throw err;
      console.log('Msg created!');
    });

    //[Optional]Save the email message to Mongo
   console.log(msg.from);
   //console.log(msg.subject);
   //console.log(msg.plaintextbody);

    //Check for attachments, if exists extract each attachment and save it to the file system ["uploads" folder] 
    if (mail.attachments) {
        mail.attachments.forEach(function (attachment) {
            fs.writeFile( __dirname + "/uploads/" + attachment.generatedFileName, attachment.content, 'base64', function(err) {
                   if (err!=null)
                        console.log("Error = " + err);
                });
        });
    }
    //[Optional]Save the email message to file system as .txt/.json
    /*fs.writeFile("/tmp/test/email_" + mail.messageId + '.txt', JSON.stringify(msg), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });*/
});

//---------------------------------------------------------------------------------------------------------
// Mail Processor end event
//---------------------------------------------------------------------------------------------------------
mailProcessor.on('end',function(){
  console.log('Mail Processor  ended');
});

//Star the Mail Processor
mailProcessor.start();
