var express = require('express');
var router = express.Router();
var ssn; // we have declare ssn everytime dealing with session!!

router.post('/', function(req, res, next) {
   
      res.render('payment', { title: "Simone's Academy" });

  });

  router.get('/', function(req, res, next) {
    ssn=req.session;
    if(ssn.email){
      res.render('payment', {is_session:ssn.email, title: "Simone's Academy" });
    }
  });
module.exports = router;
