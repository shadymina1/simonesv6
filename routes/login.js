var express = require('express');
var router = express.Router();
var ssn; // we have declare ssn everytime dealing with session!!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";
/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session; 
  res.render('login', { title: "Simone's Academy" });
});


router.post('/', function(req, res, next) {
  console.log('======-myTest-1-====');//testing
  ssn = req.session;
  ssn.email=req.body.email;
  ssn.pass=req.body.pass;
  console.log(ssn.email +"  - "+ssn.pass  ); //testing
  MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
    console.log('======-myTest-2-====');
    if(err)throw err;
    var dbo = db.db ("Simones");
    var query= {$and:[{email:ssn.email},{pass:ssn.pass}]};
    console.log("=======query:"+query + " ssn.email :"+ ssn.email+ " ========="); // testing
    dbo.collection("accounts").findOne(query,( function (err,result){
      console.log( "============ results :"+ result);//testing
      if(err) throw err;
      db.close();
      if(result){
        ssn.numOfStudents = result.numOfStudents;
        console.log('======-myTest-3-FOUND accounts====');
        if(ssn.numOfStudents>0){
          res.redirect('/userDash');
        }else{
          res.redirect('/emptyDash');
        }
      }else{
        console.log('======-myTest-8-====');
         req.session.destroy();
        res.render('login', { title: "Simone's Academy",
        wrong:'Wrong email or passowrd \n try again or',
        erollNow:'enroll with  a new email now'});   
        console.log('======-myTest-9-====');
      }
    }));
  });



});

module.exports = router;
