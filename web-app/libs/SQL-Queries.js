module.exports = {
  OCC_LIST: "SELECT * FROM dingo.OCCUPATION WHERE OCC_CODE NOT LIKE '%-0000%';",
  EDU_LIST: "SELECT * FROM dingo.EDUCATIONALLEVEL WHERE EDUCATIONLEVELID <> 'UNDT';",
  STATE_LIST: "SELECT * FROM dingo.STATE;",
  FAV_LIST: "SELECT * FROM dingo.Favorites WHERE userID = ?;",
  UPDATE_USER:  "UPDATE dingo.User " +
                "SET firstname = ?, lastname=?, stateID=?, eduLevelID=?, " +
                "OCC_CODE=?, companyEmp=?, salary=? " +
                "WHERE userID=?;",
  OCC_BY_STATE: "Select DISTINCT OCC_TITLE from OCC_STATS " +
                "WHERE OCC_CODE not like '%0000%' AND YEAR_ID LIKE ?  AND STATE_ID LIKE ?;",
  ADD_FAV:  "INSERT INTO dingo.Favorites (userID, queryData) VALUES (?, ?);",
  GET_FAV:  "SELECT favID, queryData FROM dingo.Favorites WHERE userID = ?;",
  DEL_FAV:  "DELETE FROM dingo.Favorites WHERE favID = ?;",
  MEAN_SALARY:  "SELECT AVG(A_MEAN) as AVG_MEAN, OCC_TITLE FROM dingo.OCC_STATS WHERE OCC_TITLE = ?;", 
  TOP_TEN_OCC: "SELECT STATE_ID, TOT_EMP FROM dingo.OCC_STATS WHERE OCC_TITLE = ? AND YEAR_ID = '2014' GROUP BY TOT_EMP DESC, STATE_ID LIMIT 10;",
  EDU_LEVEL:  "SELECT S1.OCC_TITLE, S3.LEVELDESCRIPTION FROM dingo.OCC_STATS S1, dingo.OCCUPATION S2, dingo.EDUCATIONALLEVEL S3 WHERE S1.OCC_CODE = S2.OCC_CODE AND S2.OCC_TITLE = ? AND S3.EDUCATIONLEVELID = S2.EDUCATIONLEVELID;",
  DECLINE_JOBS: "call GET_DECLINE_JOB(?)",
}
