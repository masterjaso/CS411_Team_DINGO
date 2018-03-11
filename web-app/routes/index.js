var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let conn, k;
  let occ = {};
  try{

    conn = await mysql.createConnection(req.dbOpt);
    
    //Get Occupation List
    let [rows, fields] = await conn.execute("SELECT OCC_TITLE, TOT_EMP FROM dingo.OCC_STATS  " +
                              "WHERE TOT_EMP > 1000000 AND OCC_TITLE <> 'All Occupations';", []);
    
    k = rows;
    
    for(var i = 0; i < k.length; i++){
      //var occ  = {
 	//occ_title:k[i].OCC_TITLE,
 	//tot_emp:k[i].TOT_EMP
	//}
      occ[ k[i].OCC_TITLE ] = k[i].OCC_TITLE;
      //occ[ k[i].TOT_EMP ] = k[i].TOT_EMP;
    }
  conn.end();
  }
  catch(e){console.log(e);}
  // console.log(occ);
  res.render('index', { title: 'Career Explorer', occ : occ});
});

module.exports = router;
