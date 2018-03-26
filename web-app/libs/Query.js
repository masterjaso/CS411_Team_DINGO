var mysql = require('mysql2/promise');

class Query{
	constructor(options){
		this.db = mysql.createPool(options);
	}
	
	async select(stmnt){
		var conn, res;
		
		try{
			conn = await this.db.getConnection();
			res = await conn.execute(stmnt);
			conn.release();
		}
		catch(e){console.log(e);}
		
		return res[0];
	}
}

module.exports = Query;