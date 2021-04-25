var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";
var nodemailer = require('nodemailer');
var ssn;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test.shady.mina.ca@gmail.com',
    pass: 'that4TriOS'
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  

  res.render('sendPassword', {title: "Simone's Academy"});

});
router.post('/', function (req, res, next) {

  recoverEmail = req.body.recoverEmail;
 
  MongoClient.connect(url , { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Simones");
    var query = {
      email: recoverEmail
    };
    dbo.collection("accounts").findOne(query, (function (err, result) {
      if (err) throw err;
      user = result.user;
      recoverEmail = result.email
      console.log(result);
      db.close();
      if (result) {
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
        var tempPass = makeid(50)
        
        console.log(tempPass);
        ////////////////////////////// creating temperory passowrd DONE--
        //=========== putting tempPass in DB
        MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
          if(err) throw err;
          var dbo = db.db("Simones");
          var query= {email:recoverEmail}
          var reset =  {$set:{  tempPass:tempPass}};
          dbo.collection("accounts").updateOne(query,reset, function(err,res){
            if (err) throw err;
            console.log(res.insertedCount +" Docs");
            db.close();
          });
        });
        //===========
        var mailOptions = {
          from: 'test.shady.mina.ca@gmail.com',
          to: recoverEmail,
          subject: 'Your Simone\'s Academy Account ',
          html: '<h1>Hello ' + user + '!  </h1>\n <h2> To confirm resetting your passowrd, please click on the below link </h2>\n  <a href="http://localhost:8080/recoverPassword?q='+tempPass+'">'+tempPass+'</a> \n<h3>Thank you</h3>'
        };
          transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
            console.log('=====Not very Bad!!========')
          } else {
            console.log('Email is already sent: ' + info.response);
          }
           res.render('sendPassword', {title: "Simone's Academy",is_session:null,sent:true});
        });
      }
    }));
  });
});
module.exports = router;