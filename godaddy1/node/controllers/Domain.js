var domain = require('../modules/domains');

var config = require("../config/config");

var Users = {
  search: function (req, res) {
    const search = req.params.id;
    console.log("inside login api");
    console.log("search data", search);

    domain.findOne(
      {$and:[
        {'Domains.domainName': search}]
      },
      function (err, user) {
        console.log("********");
        console.log("the user is",user);
        if (err || !user) {
          res
            .status(200)
            .json({ status: "error", message: "Domain Not Found" });
        } else {

          res.status(200).json({
            status: "success",
            message: "Domain Found Succesfully",
            docs: user
          });
        }
      })
  },

  addDomain: function (req, res) {
    var addDomain = new domain();

    console.log(req.body)
    saveDomains();
   async function saveDomains()
   {
      // addDomain.Domains = req.body[0];
      for (i = 0; i < req.body.length; i++)
       {
        addDomain.Domains[i] = req.body[i];
       }
    }
   
   // console.log(addDomain.Domains)

    saveDomains().then(()=>{
    addDomain.save(function (err) {
      if (err) {
        res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
      } else {

        res.status(200).json({ status: 'success', message: 'registration suceesfully Successfully', docs: '' });
      }

    });
  })
  }


}
module.exports = Users;

