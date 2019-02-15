
var config ={
    Port:4000,
    site: 'http://localhost/#/',
      mongo:{
          hostname:'localhost',
          port:'27017',
          db:'QuizDB'

      }
}
config.mongo.url='mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports = config;

  //  const abcKeyNames = Object.keys(req.body.questions);
            //  console.log("hi \t"+abcKeyNames);
            //  var length = Object.keys.length;
            //    console.log(length);

            //    Object.keys(req.body).foreach(item
            //    {
            //       console.log(item);
            //    });
               
            // Object.keys(req.body).forEach(function(key) {
            //     console.log(req.body[key]); 
            //     console.log("/t  "+req.body[key][0].question);  
            //     console.log("/t  "+req.body[key][0].option1); 
            //     console.log("/t  "+req.body[key][0].option2); 

            // // });
            //  user.meta.topic = req.body.topic;
            //  user.meta.question = req.body[key][0].question;
            //  user.meta.option1 = req.body[key][0].option1;
            //  user.meta.option2 = req.body[key][0].option2;
            // user.meta.option3 = req.body[key][0].option3;
            // user.meta.option4 = req.body[key][0].option4;
            // user.meta.answer = req.body[key][0].answer;
            // user.save();
            // });
               //console.log(length);
       // for(var i = 0; i <1; i++) {

        // user.meta.topic = req.body.topic;
        // user.question = req.body.questions[0].question;
      //  user.meta.option1 = req.body.questions[0].option1;
      //  user.meta.option2 = req.body.questions[0].option2;
      // user.meta.option3 = req.body.questions[0].option3;
      // user.meta.option4 = req.body.questions[0].option4;
      // user.meta.answer = req.body.questions[0].answer;
