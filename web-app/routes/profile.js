var express = require('express');
var router = express.Router();
var passport = require('../app.js').passport;
const mysql = require('mysql2/promise');
const q = require('../libs/SQL-Queries');

/* GET users listing. */
router.get('/', async function(req, res, next){
  if(!req.authCheck){ 
    res.redirect('/login');
    return;
  }
  
  var profileData = await req.q.select('select * from User where userID = ?', [req.user.userID]);
  var userStateID = await req.q.select('select stateID from User where userID = ?', [req.user.userID]);
  var currentOCC = await req.q.select('SELECT S2.OCC_TITLE FROM User S1, dingo.OCCUPATION S2 WHERE S1.userID =  ? ' +
                                          'AND S1.OCC_CODE = S2.OCC_CODE', [req.user.userID]);
  var currentEMP = await req.q.select('select companyEmp from User where userID = ?', [req.user.userID]);
  var currentSalary = await req.q.select('select salary from User where userID = ?', [req.user.userID]);
  var currentEdu = await req.q.select('select eduLevelID from User where userID = ?;', [req.user.userID]);

  let conn, k;
  let occ = {};
  let edu = {};
  let state = {};
  let fav;

  
  try{
    conn = await mysql.createConnection(req.dbOpt);
    
    //Get Occupation List
    let [rows, fields] = await conn.execute(q.OCC_LIST, []);
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      occ[ k[i].OCC_CODE ] = k[i].OCC_TITLE;
    }
    
    //Get Education List
    [rows, fields] = await conn.execute(q.EDU_LIST, []);
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      edu[ k[i].EDUCATIONLEVELID ] = k[i].LEVELDESCRIPTION;
    }
    
    //Get States List
    [rows, fields] = await conn.execute(q.STATE_LIST, []);
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      state[ k[i].STATE_ID ] = k[i].STATENAME;
    }
    
    //Get Favorites List
    [rows, fields] = await conn.execute(q.GET_FAV, [req.user.userID]);
    fav = rows;
    
    for(var i = 0; i < fav.length; i++){
      fav[i].queryData = JSON.parse(fav[i].queryData);
    }
    
    conn.end();
  }
  catch(e){console.log(e);}
  console.log( fav );

  res.render('profile', { 
    title: 'Career Explorer - Your Profile',
    data: profileData, userStateID:userStateID, currentOCC:currentOCC, 
    currentEMP:currentEMP, currentSalary:currentSalary, currentEdu:currentEdu,
    message: req.flashMsg, occ:occ, edu:edu, state:state, fav:fav
  });

  
});

router.post('/', async function(req, res, next){
  console.log('POST1');
  let conn, k;
  //Handle favorite delete request
  if(req.body.fav){
    console.log('FAV HIT');
    delete req.body['fav']
    
    try{
      conn = await mysql.createConnection(req.dbOpt);
      let [rows, fields] = await conn.execute(q.DEL_FAV, [req.body.favID]);
      conn.end();
    }
    catch(e){console.log(e);}
    res.json({data:'OK'});
    return;
  }
  
  console.log('POST2');
  let args = [
    req.body.fname,
    req.body.lname,
    req.body.state,
    req.body.currentEdu,
    req.body.occ_title,
    req.body.companyEmp,
    req.body.salary,
    req.user.userID
  ];

  
  try{ 
    conn = await mysql.createConnection(req.dbOpt);
    
    //UPDATE User Record
    let [rows, fields] = await conn.execute(q.UPDATE_USER, args);
    k = rows;
    //Setup new User Entry
    
    conn.end();
  }
  catch(e){console.log(e);}

  res.redirect('/profile');
});
module.exports = router;
