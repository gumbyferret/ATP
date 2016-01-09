// Use mongoose in the project

var mongoose = require('mongoose');

// Connect to a MongoDB database locally

mongoose.connect('mongodb://localhost/incoming');

// First define the schema

var Schema = mongoose.Schema;

// Create a schema called userSchema.  ALlowed schemaTypes are String, Number, Data, Buffer
// Boolean, Mixed, ObjectId, Array

var msgSchema = new Schema({
  name: String,
  message: String,
  created_at: Date,
  delete_flag: String
});

// Run a function before saving
// on every save, add the date
msgSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


var Messages = mongoose.model('Message', msgSchema);

// make this available to our users in our Node applications

module.exports = Messages;
