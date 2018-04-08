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
}