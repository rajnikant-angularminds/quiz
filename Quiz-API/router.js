const express = require('express');
const router = express.Router();
const user = require('./controller/User');
const access = require('./controller/Access');

console.log("inside router...");


//login and authentication
router.post('/quizapp/login/',access.LoginUser);
router.post('/quizapp/checkAdmin/',access.isAdmin);

// store quiz data
router.post('/quizapp/admin/',user.create);
router.post('/quizapp/insertdata/',user.createques);

router.post('/quizapp/score/',user.storescore);

router.post('/quizapp/register/',access.register);
router.post('/quizapp/getQue/',user.getQuiz);
router.get('/quizapp/getAllData/',user.getAll);
router.post('/quizapp/delQuiz/',user.delQuiz);


module.exports = router;