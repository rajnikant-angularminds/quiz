//Packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cors = require('cors')
var config = require('./config/config');
var router = require('router');
console.log("inside server...");
//bodyParser json
var app = express();
app.use(bodyParser.json());

//app.use(express.static('upload'));
/**
* Set headers for Cross origin
*/
app.use(cors())
app.all('/*', function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//app.use('/', router());
app.use('/', require('./router'));
//app.use('/')
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    res.status(404).json({status:"Page not found"}).end();
    
});

//Start server
app.set('port', config.port);

var server = app.listen(4000, function() {
    console.log('Express server listening on port ' + server.address().port);
});




// Database Connection
mongoose.connect(config.mongo.url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

}); 
