
var express = require('express');
var router = express.Router();
var ssn; // we have declare ssn everytime dealing with session!!
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://simone:fortheacademy@cluster0.8z6e8.mongodb.net/<dbname>?retryWrites=true&w=majority";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err,db){
    if(err) throw err;
    var dbo = db.db("Simones");
    var newStudent = { email: ssn.email  };
    dbo.collection("students").insertOne(newStudent, function(err,res){
      if(err) throw err;
      console.log(res.insertedCount +" Docs"); //debuging perpose
      db.close();        
    });    
  });