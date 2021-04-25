var express = require('express');
var router = express.Router();
var ssn;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";

/* GET home page. */
router.post('/', function(req, res, next) {
  ssn = req.session; 
  var locateStudent = parseInt(req.body.student1);
  if(ssn.email){
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
      console.log('======-myTest-2-====');
      if(err)throw err;
      var dbo = db.db ("Simones");   
      var query1={$and:[{email:ssn.email},{studentNum:locateStudent}]};
          dbo.collection("students").findOne(query1,( function (err,result1){
            console.log("connected in profileStudent")
            if(err) throw err;
            console.log(result1)
            if(result1){
              console.log('======-Student-TestNo4-FOUND student====' + result1.fName);
              console.log(result1);  
              ssn.studentNum = result1.studentNum;        
              ssn.fName=result1.fName;
              ssn.lName=result1.lName;
              ssn.grade=result1.grade
              ssn.sun3=result1.sun3;
              ssn.mon3=result1.mon3;
              ssn.tue3=result1.tue3;
              ssn.wed3=result1.wed3;
              ssn.thu3=result1.thu3;
              ssn.fri3=result1.fri3;
              ssn.sat3=result1.sat3;
              ssn.sun4=result1.sun4;
              ssn.mon4=result1.mon4;
              ssn.tue4=result1.tue4;
              ssn.wed4=result1.wed4;
              ssn.thu4=result1.thu4;
              ssn.fri4=result1.fri4;
              ssn.sat4=result1.sat4;
              ssn.sun5=result1.sun5;
              ssn.mon5=result1.mon5;
              ssn.tue5=result1.tue5;
              ssn.wed5=result1.wed5;
              ssn.thu5=result1.thu5;
              ssn.fri5=result1.fri5;
              ssn.sat5=result1.sat5;
              ssn.sun6=result1.sun6;
              ssn.mon6=result1.mon6;
              ssn.tue6=result1.tue6;
              ssn.wed6=result1.wed6;
              ssn.thu6=result1.thu6;
              ssn.fri6=result1.fri6;
              ssn.sat6=result1.sat6;
              ssn.sun7=result1.sun7;
              ssn.mon7=result1.mon7;
              ssn.tue7=result1.tue7;
              ssn.wed7=result1.wed7;
              ssn.thu7=result1.thu7;
              ssn.fri7=result1.fri7;
              ssn.sat7=result1.sat7;
              ssn.sun8=result1.sun8;
              ssn.mon8=result1.mon8;
              ssn.tue8=result1.tue8;
              ssn.wed8=result1.wed8;
              ssn.thu8=result1.thu8;
              ssn.fri8=result1.fri8;
              ssn.sat8=result1.sat8;
              db.close();

              res.render('profileStudent', {
                is_session:ssn.email,
                title: "Recieved",
                fName:ssn.fName,
                lName:ssn.lName,
                grade:ssn.grade,
                sun3:ssn.sun3,
                mon3:ssn.mon3,
                tue3:ssn.tue3,
                wed3:ssn.wed3,
                thu3:ssn.thu3,
                fri3:ssn.fri3,
                sat3:ssn.sat3,
                sun4:ssn.sun4,
                mon4:ssn.mon4,
                tue4:ssn.tue4,
                wed4:ssn.wed4,
                thu4:ssn.thu4,
                fri4:ssn.fri4,
                sat4:ssn.sat4,
                sun5:ssn.sun5,
                mon5:ssn.mon5,
                tue5:ssn.tue5,
                wed5:ssn.wed5,
                thu5:ssn.thu5,
                fri5:ssn.fri5,
                sat5:ssn.sat5,
                sun6:ssn.sun6,
                mon6:ssn.mon6,
                tue6:ssn.tue6,
                wed6:ssn.wed6,
                thu6:ssn.thu6,
                fri6:ssn.fri6,
                sat6:ssn.sat6,
                sun7:ssn.sun7,
                mon7:ssn.mon7,
                tue7:ssn.tue7,
                wed7:ssn.wed7,
                thu7:ssn.thu7,
                fri7:ssn.fri7,
                sat7:ssn.sat7,
                sun8:ssn.sun8,
                mon8:ssn.mon8,
                tue8:ssn.tue8,
                wed8:ssn.wed8,
                thu8:ssn.thu8,
                fri8:ssn.fri8,
                sat8:ssn.sat8,
                                });
              

              
            }else{ //closing if(result1)

              //you don't have any registered student under your account >>>>VIP<<<

            }
          }));
        });



  
  }else{ //closing if(ssn.email)
    res.redirect('/login')
  }


});







module.exports = router;
