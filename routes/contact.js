var express = require('express'); // Require the express
var router = express.Router(); // Help us to the navigation
var nodemailer = require ('nodemailer'); 
var ssn;
var transporter = nodemailer.createTransport({  
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  service: 'gmail',
  auth: {
    user: 'test.shady.mina.ca@gmail.com',
    pass: 'that4TriOS'
  }
});
 

router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('contact', { errorMessage: ssn.err,is_session:ssn.email }); 
});
  router.post('/', function(req, res, next) {
    ssn = req.session;

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
 
  var mailOptions = {
    from: 'test.shady.mina.ca@gmail.com',
    to: 'test.shady.mina.ca@gmail.com' ,
    subject: 'Message From' + firstName + lastName + 'about' + subject,
    text: 'Message: ' + message + '\n From:' + firstName + lastName 
    + '\n User email address: ' + email
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.render('contact', { errorMessage: 'Something went wrong' });
      console.log('=====ZZZZZZZNot very Bad!!!!!!!!!!!!!!!!!!! ======== ' + message + ' ====---==---===' + firstName );
    } else {
      console.log('Email is already sent: ' + info.response);
      ssn.ackMessage = "Your messgae has been sent successfully, Thank you ! "
      ssn.ackMessage2 = "We will contact you shortly!"
      
      ssn.redirecting = './';
      res.redirect('/thanks');
    }
  });
});
module.exports = router;