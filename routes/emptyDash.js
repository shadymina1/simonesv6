var express = require('express');
var router = express.Router();
var ssn;
//message: you don't have any students regestered under your account yet, add one;
router.get('/', function(req, res, next) {
    ssn = req.session;
    res.render('emptyDash', { is_session:ssn.email,title: "Simone's Academy -User dashboard" ,userName:ssn.userName });
});

module.exports = router;
