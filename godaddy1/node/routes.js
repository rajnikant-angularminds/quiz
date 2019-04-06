var express = require("express");
var router = express.Router();

var access = require("./controllers/Access.js");
var domain = require("./controllers/Domain.js");
//var user = require("./controllers/User.js");


router.post('/godaddy/login/',access.LoginUser);
router.post('/godaddy/register/',access.register);
router.get('/godaddy/search/:id',domain.search);
router.post('/godaddy/addDomain/',domain.addDomain);

// router.post("/subject/save/:name", subject.create);
// router.get("/subject/getAll/", subject.getAll);
// router.get("/subject/getAll/:val", subject.getMatching);
// router.get("/subject/getOne/:id", subject.getOne);
// router.delete("/subject/delete/:id", subject.delete);
// router.post("/search/subject/", subject.checkSubject);
// router.post("/topic/save/", topic.create);



module.exports = router;
