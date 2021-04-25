var express = require('express');
var router = express.Router();
var ssn; 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";;


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn=req.session;
  
  if(ssn.email){
    console.log("from GET userdash ==== ssn.email" + ssn.email)
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){

      if (err) throw err;
      var dbo = db.db("Simones");
      var query = {email: ssn.email};
      dbo.collection("accounts").findOne(query,( function (err,result){
          if(err) throw err;
         
            console.log(result);
            ssn.student1= result.student1;
            ssn.student2= result.student2;
            ssn.student3= result.student3;
            ssn.student4= result.student4;
            ssn.numOfStudents = result.numOfStudents;
            console.log("student1 === " + result.student1);
            console.log("student1 === " + ssn.student1);
            var sumAdmFees = ssn.numOfStudents *30;// Total administration fees
            
        
            db.close();
            res.render('userDash' ,{title: "User Dashboard", is_session:true,
            userName:ssn.userName ,
            noStudents:"Currentlly, you don't have any student under your account.",
            student1: ssn.student1,
            student2: ssn.student2,
            student3: ssn.student3,
            student4: ssn.student4,
            numOfStudents:ssn.numOfStudents,
            sumAdmFees:sumAdmFees,
            sumlMonFees:sumAdmFees*2

          });
          
        }));
      });
    
  }
});

module.exports = router;
