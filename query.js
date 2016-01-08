var app = express();
var Msg = require('./message');

app.get('/', function (req, res) {
    res.send("<a href='/msg'>Show Messages</a>");
});

app.get('/msg', function (req, res) {
    Msg.find({}, function (err, docs) {
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
