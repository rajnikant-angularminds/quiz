var UserData = require('../modules/user');

var myObj, k, i,j, x = "";
    var Users ={
        LoginUser:function (req, res) {
          console.log(req.body.username, req.body.password);
          UserData.findOne({
      $and: [
        { 'userData.username': req.body.username },
         { 'userData.password': req.body.password }
      ]
    },
      function (err, user) {
        console.log("*********");
        console.log(user);
        if (err || !user) {
          res.status(400).json({ status: false, message: 'you have not user or you have not permission' });
        }
        else {
          res.status(200).json({ status: true, message: 'welcome to the system',user:user });
        }
      });
  },
  register: function(req, res)
  {
    console.log("inside registration service");
    var user = new UserData();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email= req.body.email;
    
    user.userData.username = req.body.username;
    user.userData.password = req.body.password;
    //console.log(user.userData.password);
    user.save(function (err) {
      if (err) {
          res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
      } else {

          res.status(200).json({ status: 'success', message: 'registration suceesfully Successfully', docs: '' });
      }

 });

  },
  isAdmin: function(req, res)
  {
    console.log("inside admin authentication");
    console.log(req.body.username,req.body.usertype);
   
    UserData.findOne({'usertype': req.body.usertype,'userData.username': req.body.username },
      function (err, user) {
        console.log("*********");
        console.log(user);
        if (err || !user) {
          res.status(200).json({ status: false, message: 'you do not have permission to access this page' });
        }
        else {
          res.status(200).json({ status: true, message: 'valid Admin', });
        }
      });
    //res.status(200).json({ status: 'success', message: 'valid admin', docs: '' });
  }
}
module.exports = Users;