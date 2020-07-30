var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.202.224.91',
  user     : 'root',
  password : '1234',
  database : 'testdb'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;