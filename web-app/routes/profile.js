var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next){
  if(!req.authCheck){ 
    res.redirect('/login');
    return;
  }
  
  var profileData = await req.query.select('select * from User');
  console.log(profileData);
  res.render('profile', { 
    title: 'Career Explorer - Your Profile',
    data: profileData
  });
});

module.exports = router;
