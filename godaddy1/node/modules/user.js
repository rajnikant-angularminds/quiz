var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserData   = new Schema({

    
    uname:String,
    email:String,
    password:String, 
       
            
    
});

module.exports = mongoose.model('userData', UserData);  