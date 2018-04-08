module.exports = {
  OCC_LIST: "SELECT * FROM dingo.OCCUPATION WHERE OCC_CODE NOT LIKE '%-0000%';",
  EDU_LIST: "SELECT * FROM dingo.EDUCATIONALLEVEL WHERE EDUCATIONLEVELID <> 'UNDT';",
  STATE_LIST: "SELECT * FROM dingo.STATE;",
  FAV_LIST: "SELECT * FROM dingo.Favorites WHERE userID = ?;",
  UPDATE_USER:  "UPDATE dingo.User " +
                "SET firstname = ?, lastname=?, stateID=?, eduLevelID=?, " +
                "OCC_CODE=?, companyEmp=?, salary=? " +
                "WHERE userID=?;",
}