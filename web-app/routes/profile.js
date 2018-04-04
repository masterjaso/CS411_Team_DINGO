var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
const mysql = require('mysql2/promise');


/* GET users listing. */
router.get('/', async function(req, res, next){
  if(!req.authCheck){ 
    res.redirect('/login');
    return;
  }
  
  var profileData = await req.query.select('select * from User where userID = ?', [req.user]);

  var userStateID = await req.query.select('select stateID from User where userID = ?', [req.user]);

  var currentOCC = await req.query.select('SELECT S2.OCC_TITLE FROM User S1, dingo.OCCUPATION S2 WHERE S1.userID =  ?  AND S1.OCC_CODE = S2.OCC_CODE', [req.user]);

  var currentEMP = await req.query.select('select companyEmp from User where userID = ?', [req.user]);

  var currentSalary = await req.query.select('select salary from User where userID = ?', [req.user]);

  console.log(currentOCC);
  let conn, k;
  let occ = {};
  let edu = {};
  let state = {};

  
  try{
    conn = await mysql.createConnection(req.dbOpt);
    
    //Get User's Current State ID
    let [rows, fields] = await conn.execute("SELECT * FROM dingo.OCCUPATION " +
                              "WHERE OCC_CODE NOT LIKE '%-0000%';", []);
    
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      occ[ k[i].OCC_CODE ] = k[i].OCC_TITLE;
    }
    
    //Get Education List
    [rows, fields] = await conn.execute("SELECT * FROM dingo.EDUCATIONALLEVEL " +
                              "WHERE EDUCATIONLEVELID <> 'UNDT';", []);
    
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      edu[ k[i].EDUCATIONLEVELID ] = k[i].LEVELDESCRIPTION;
    }
    
    
    //Get States List
    [rows, fields] = await conn.execute("SELECT * FROM dingo.STATE;", []);
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      state[ k[i].STATE_ID ] = k[i].STATENAME;
    }
    
    conn.end();
  }
  catch(e){console.log(e);}
  //console.log( occ );
  //console.log( edu );
  //console.log( state );

  res.render('profile', { 
    title: 'Career Explorer - Your Profile',
    data: profileData, userStateID, currentOCC, currentEMP, currentSalary,
    message: req.flashMsg, occ:occ, edu:edu, state:state
  });

  
});

router.post('/', 
  passport.authenticate('/update', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
  })
);
module.exports = router;
