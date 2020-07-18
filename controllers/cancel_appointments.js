var connection = require('./../config');
var express=require('express');
var router=express.Router();
//patient_id must come from session
module.exports.cancel_appointments=function(req,res){
	if(req.session.user_id){
	connection.query("update appointments set active=0 where patient_id=? and date=? and time=?",[req.session.user_id,req.body.date,req.body.time],function(errormain,resultmain,fieldmain){
		if(errormain){res.json({message: "Something went wrong!!"});}
		else{
			res.json({
			resultmain,
			status:true,
			message: "Appointment Cancelled"});
		}
	});
}
else{
		res.json({message: "Please login."});
	}
}