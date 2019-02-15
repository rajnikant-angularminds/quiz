var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var questionBank   = new Schema({


  name:String,
//   time:String,
// "questions":[{
//   question: String,
//    answer : String,
//    option1:String,
//    option2:String,
//   "options":[
//     {  option : String }
//       ]
//     }]
});

module.exports = mongoose.model('questionBank', questionBank);