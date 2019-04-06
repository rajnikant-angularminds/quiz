var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var domain   = new Schema({


 "Domains":[{
  domainName:String,
  price:Number,
  userFullName:String,
  address:String,
  zipcode:String,
  registrationDate:Date
 }]


});

module.exports = mongoose.model('domain', domain);

