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
  
  res.render('explore', { 
    title: 'Career Explorer',
    message: req.flashMsg, occ:occ, edu:edu, state:state
  });
});

router.post('/', async function(req, res, next){
  let conn, k, rows, fields;
  let args;
  let b = req.body
  
  //Remove empty items
  for(var i in b){
    if(b[i] === '') delete b[i]
  }
  
  if(b.fav){
    console.log('FAV HIT');
    delete b['fav']
    
    try{
      conn = await mysql.createConnection(req.dbOpt);
      switch(b.data_set){
        case 'OCC_BY_STATE':
          args = [req.user.userID, JSON.stringify(b)];
          [rows, fields] = await conn.execute(q.ADD_FAV, args);
          break;
        default:
          console.log('No Data Set Selected');
      }
      conn.end();
    }
    catch(e){console.log(e);}
    res.json({data:'OK'});
    return;
  }
  
  try{
    conn = await mysql.createConnection(req.dbOpt);
    switch(b.data_set){
      case 'OCC_BY_STATE':
        args = [b.year, b.state];
        [rows, fields] = await conn.execute(q.OCC_BY_STATE, args);
        break;
      default:
        console.log('No Data Set Selected');
    }

    k = rows;
    conn.end();
  }
  catch(e){console.log(e);}
  
  res.json(k);
});
module.exports = router;