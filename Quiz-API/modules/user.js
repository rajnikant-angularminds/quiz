var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserData   = new Schema({

    usertype:String,
    firstname:String,
    lastname:String,
    email:String,
    userData:{
        username:String,
        password:String, 
       
            
    },
    "score":[ {
        quizname:String,
        score:String}
    ]
});

module.exports = mongoose.model('userData', UserData);  