var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function (req, res, next) {
  
 // res.send('q: ' + req.query.q);
  res.render('recoverPassword', {title: "Simone's Academy",tempPass:req.query.q});
  console.log(req.query.q)
});
router.post('/', function (req, res, next) {
var tempPass = req.body.tempPass;
console.log(tempPass);
  MongoClient.connect(url , { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Simones");
    var query = {email:req.body.recoverEmail, tempPass:tempPass};
   
    dbo.collection("accounts").findOne(query, (function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      if(result.tempPass ==""){
        res.redirect('/accessDenied');
      }else{
        if (result) {
          MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
            if(err) throw err;
            var dbo = db.db("Simones");
            var query = {email:req.body.recoverEmail, tempPass:req.body.tempPass};
            var changePass = {$set:{pass:req.body.newPass,tempPass:result._id}};
            dbo.collection("accounts").updateOne(query,changePass, function(err,res){
              if (err) throw err;
              console.log(res.insertedCount +" Docs");
              db.close();
            });
          });
        }
      }
    }));
  });
  res.redirect('/login');

});
module.exports = router;