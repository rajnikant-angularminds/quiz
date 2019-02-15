var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Quiz   = new Schema({


  topic:String,
  time:String,
"questions":[
  {question: String,
   answer : String,
   option1:String,
   option2:String,
  "options":[{option : String}]
  }
],
answer:[]
});

module.exports = mongoose.model('quizSchema', Quiz);

//,{option2 : String},{option3 : String},{option4 : String},{option5 : String}
//   topic:String,
  //   meta :{
   
  // //Q_no: Number,
  // question: String,
  // option1 : String,
  // option2 : String,
  // option3 : String,
  // option4 : String,
  // answer : String

  //   }