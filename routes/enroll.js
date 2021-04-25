var express = require('express');
var router = express.Router();
var ssn; // we have declare ssn everytime dealing with session!!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";

var nodemailer = require ('nodemailer'); 
var transporter = nodemailer.createTransport({  
    service: 'gmail',
    auth: {
      user: 'test.shady.mina.ca@gmail.com',
      pass: 'that4TriOS'
    }
  });


  /* GET home page. */
router.get('/', function(req, res, next) {
    ssn = req.session; 
    res.render('enroll', { is_session:ssn.email,title: "Simone's Academy" });

});

router.post('/', function(req, res, next) {
    ssn = req.session; 
    ssn.numOfStudents =0;
    ssn.pass = req.body.pass; 
    ssn.email = req.body.email; 
    ssn.userName = req.body.userName; 
    ssn.cell = req.body.cell; 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
      if (err) throw err;
      var dbo = db.db("Simones");
      var query = {email: ssn.email};
      dbo.collection("accounts").findOne(query,( function (err,result){
        if(err) throw err;
        console.log(result);
        db.close();
        if(result){ 
          console.log('======double======');
          res.render('enroll', {is_session:null, messageToRegister:' The email is already rigestered'});
          req.session.destroy();
        }else{
          //////////////////////////////// creating temperory passowrd
          function makeid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
          return result.join('');
          }
          var tempPass = makeid(52)
          console.log(tempPass);
          ////////////////////////////// creating temperory passowrd DONE--
          MongoClient.connect(url, function(err,db){
            if(err) throw err;
            var dbo = db.db("Simones");
            var newAccount = { email: ssn.email , pass:ssn.pass , cell:ssn.cell , user:ssn.userName , numOfStudents:ssn.numOfStudents, tempPass:tempPass };  
            dbo.collection("accounts").insertOne(newAccount, function(err,res){
              if(err) throw err;
              console.log(res.insertedCount +" Docs"); //debuging perpose
             db.close();
            });          
          });
         var myLink = "<a href='http://localhost:8080/ourclasses?"+ssn.userName+"'>"+ssn.userName+"</a>";
          var mailOptions = {
            from: 'test.shady.mina.ca@gmail.com',
            to: ssn.email,
            cc: 'shady.mina.ca@gmail.com',
            subject: 'Welcome to Simone\'s Art Academy',
            //html: '<h1>Hello ' + ssn.userName +"!" +'\n Welcome to Simone\'s Art Academy, \n Your account has been registered successfully.</h1>'
          html : myLink
          };
          transporter.sendMail(mailOptions, function(err, info){
            if (err) {
              console.log(err);               
              console.log('=====Not very Bad!!========\n===='+errorMessage+'====\n=====Not very Bad!!========\n');
            } else {
              console.log('Email is already sent: ' + info.response);
            }
          });
          res.redirect('/emptyDash');
        }
    }));
    
  });

  

});

module.exports = router;