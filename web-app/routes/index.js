var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let conn, k;
  let occ = [];
  let hpaid = [];
  try{
    conn = await mysql.createConnection(req.dbOpt);
    
    //Get Occupation List
    let [rows, fields] = await conn.execute("SELECT OCC_TITLE, TOT_EMP, YEAR_ID FROM dingo.OCC_STATS  " +
                              "WHERE TOT_EMP > 1000000 AND OCC_TITLE <> 'All Occupations';", occ);
    
    k = rows;
    conn.end();
  }
  catch(e){console.log(e);}

  try{
    conn = await mysql.createConnection(req.dbOpt);
    
    //Get Occupation List
    let [rows, fields] = await conn.execute("SELECT DISTINCT OCC_TITLE, A_MEDIAN FROM dingo.OCC_STATS  " +
                              "GROUP BY OCC_TITLE ORDER BY A_MEDIAN DESC LIMIT  10;", hpaid);
    
    c = rows;
    conn.end();
  }
  catch(e){console.log(e);}
  res.render('index', { title: 'Career Explorer', occ : JSON.stringify(k), hpaid : JSON.stringify(c)});
});

module.exports = router;
