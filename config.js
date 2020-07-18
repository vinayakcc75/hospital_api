var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.200.193.123',
  user     : 'sakshi',
  password : 'summer2020',
  database : 'test_db'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;