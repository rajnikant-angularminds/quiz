var QuizSchema = require('../modules/Quiz');
var UserData = require('../modules/user');
var questionBank = require('../modules/questionBank');
var myObj, k, i,j, x = "";

// var questions = new Array(len);
// var Answers = new Array(len);
// var option1 = new Array(len);
// var Option2 = new Array(len);
    var Users ={
        create: function (req, res) {
      //    console.log("inside user");
             var user = new Quiz();

             console.log(req.body.topic);
           //  console.log(req.body.questions[0]);

           
            //  for (i = 0; i < req.body.questions.length; i++) {
            //       console.log( req.body.questions[i]);
            //       }  

                  user.topic = req.body.topic;
                
                  user.questions =  req.body.questions[0];
                  console.log(user.questions);
                  for (i = 0; i < req.body.questions.length; i++) {
                      user.questions[i]=req.body.questions[i];
                      
                      console.log(i)
                     }  
                    
                   // user.save();
                  user.save(function (err) {
                      if (err) {
                          res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
                      } else {
          
                          res.status(200).json({ status: 'success', message: 'Document Added Successfully', docs: '' });
                      }
          
                 });

             
        },
        createques: function (req, res) {
            
            var user = new QuizSchema();
            console.log(req.body.questions.length);
            var answers=[];
                 user.topic=req.body.name;
                 user.time = req.body.time;
                  user.questions =  req.body.questions[0];
                  answers  = req.body.answers;
                  user.answer= answers;
                    //  console.log(user.questions);
                      console.log(answers);

                      for (i = 0; i < req.body.questions.length; i++) {
                          user.questions[i]=req.body.questions[i];
                          
                          //console.log(i)
                         }  
                       user.save(function (err) {
                        if (err) {
                            res.status(500).json({ status: 'error', message: 'Database Error:' + err, docs: '' });
                        } else {
            
                            res.status(200).json({ status: 'success', message: 'Document Added Successfully', docs: '' });
                        }
            
                  });
               
              },
    getQuiz : function(req, res) 
    {
        console.log(req.body.topic);
        console.log("inside get question");
        
        QuizSchema.findOne({
            $and: [{ 'topic': req.body.topic }
            ]},function(err, user) {
            console.log("********");console.log(user);
                if (err || !user) 
                {
                    res.status(400).json({ status: 'error', message: 'No such Topic found ...' });
                }
                 else {
                     res.status(200).json({ status: 'success', message: 'success get Topic data....',user:user});
                    }
                });
      },
    
    getAll:function(req, res) 
    {
        console.log("inside getAll");
        
        QuizSchema.find(function(err,user)
        {
            if (err) 
            {
                res.status(400).json({ status: 'error', message: 'No data found ...' });
            }
             else {
                 res.status(200).json({ status: 'success', message: 'success get data....',user:user});
                }
            
        });
    },
    delQuiz: function(req, res)
    {
        console.log("inside delete quiz topic", req.body.id);
        
        QuizSchema.deleteMany({"_id": req.body.id},function(err,user)
        {
            if (err) 
            {     console.log("hi");
                res.status(400).json({ status: 'error', message: 'No record found ...' });
                
            }
             else {
                console.log("hello");
                 res.status(200).json({ status: 'success', message: 'record successfully removed....',user:user});
                }
            
        });
    },
    storescore:function(req, res)
    {
        //console.log("inside store score", req.body);

            UserData.findOne({

                    $and: [
                        { "userData.username": req.body.user }
                       ]
                    },function (err, user) {
                    var len=user.score.length;
                                console.log("********");console.log(len);
                               // user.userData.score.push({"quizname": req.body.topic,"score": req.body.score });
                            //   console.log(user.score);
                                    user.score[len]={"quizname":req.body.topic,"score":req.body.score}
                                   // user.score.[len] = req.body.topic;
                                user.save(function (err) {
                                    if (err) {
                                        res.status(500).json({ status: 'error', message: 'No user found  ...' + err, docs: '' });
                                    } else {
                        
                                        res.status(200).json({ status: 'success', message: 'record successfully updated....', docs: '' });
                                    }
                        
                               });
                                  
                      })
           
       
    },
} 
  module.exports = Users;

       