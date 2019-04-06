var UserData = require('../modules/user');
var jwt = require("jsonwebtoken");;
var config = require("../config/config");
const Cryptr = require("cryptr");
var myObj, k, i,j, x = "";
    var Users ={
        LoginUser:function (req, res) {
          console.log("inside login api");
          console.log(req.body);
          //{ username: 'rajni@gmail', password: '123' }
          
          UserData.findOne(
            {
              $and: [{ 'uname': req.body.username }, { 'password': req.body.password }]
            },
            function(err, user) {
              console.log("********");
              console.log(user);
              if (err || !user) {
                res
                  .status(200)
                  .json({ status: "error", message: "Authentication failed" });
              } else {
                var payload = { 'uname': user.username };
                var token = jwt.sign({ payload }, config.secretKey, {
                  expiresIn: "1h"
                });
                console.log(token);
                res.status(200).json({
                  status: "success",
                  message: "Succesfully login",
                  token: token
                });
              }
            }
          );

    
  },
  register: function(req, res)
  {
    console.log("inside registration service");
    var user = new UserData();
    console.log(req.body);
    user.uname = req.body.uname;
    user.email= req.body.email;
    user.password = req.body.password;
   
    user.save(function (err) {
      if (err) {
          res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
      } else {

          res.status(200).json({ status: 'success', message: 'registration suceesfully Successfully', docs: '' });
      }

    });

  },
  get:function(req, res)
  {
    console.log("inside get calll");
  }

}
module.exports = Users;