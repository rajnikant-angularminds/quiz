//Packages
const express = require("express");
const http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var config = require('./config/config');



/************************* START App initialization ************************************/
/****************************************************************************************************/


var app = express();


var db;
let x = true;

//Parse json
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("hello world");
});

//Set headers for Cross origin
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

// app.all('/secure/*', [require('./middlewares/validateRequest')]);

app.use("/", require("./routes"));

/** */
app.use(express.static('public'))
app.use(express.static('view'))


app.use(function(req, res, next) {
  res
    .status(404)
    .json({ status: "Page not found" })
    .end();
});



/** */

app.get("/", function(req, res) {
  res.send("hello world");
});

//Start server
app.set('port', config.port);

var server = app.listen(8080, function() {
    console.log('Express server listening on port ' + server.address().port);
});
// const server = http.Server(app);
// var serve= server.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + serve.address().port);
// });

//************************* End of socket code  *******************************************************/
/***************************************************************************************************/


// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
});

/************************* END Server & DB Connection **********************************************/
/***************************************************************************************************/
