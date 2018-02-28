var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;

router.get('/', function(req, res, next){
  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flashMsg });
});

router.post('/', 
  passport.authenticate('signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
  })
);

module.exports = router;
