var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next){
  if(!req.authCheck){ 
    res.redirect('/login');
    return;
  }
  
  res.render('profile', { 
    title: 'Career Explorer - Your Profile',
    data: {}
  });
});

module.exports = router;
