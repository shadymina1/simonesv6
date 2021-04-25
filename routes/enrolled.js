var express = require('express');
var router = express.Router();

var ssn;
router.get('/', function(req, res, next) {
     res.render('enrolled', { title: "Simone's Academy" });
});
router.post('/', function(req, res, next) {
     res.redirect('/profileStudent')
});

module.exports = router;