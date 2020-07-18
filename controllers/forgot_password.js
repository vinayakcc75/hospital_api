var connection = require('./../config');
var express=require('express');
var router=express.Router();

module.exports.forgotpass=function(req,res){
	connection.query("update login set password = ? where email = ?",[req.body.new_pass,req.body.username],function(errormain,resultmain,fieldmain){
		if(errormain){res.json({errormain,message:"Some error occured!!"});}
		else{
			res.json({
			status:true,
			message: "Password Reset"});
		}
	});
}