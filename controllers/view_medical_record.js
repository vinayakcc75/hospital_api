var connection = require('./../config');
var express=require('express');
var router=express.Router();

module.exports.records=function(req,res){
	console.log(req.session.user_id);
	if(req.session.user_id){
		//session value
		var user_id=req.session.user_id;
		//var user_id=1;
	connection.query("select * from medical_records where patient_id=?",[user_id],function(errormain,resultmain,fieldmain){
		if(errormain){res.json({message:errormain});}
		else{
			if (resultmain.length>0){
			res.json({
			status:true,
			message: resultmain});
		}else{
			res.json({
			status:false,
			message: 'No records available.'});}
		}
	});
}
else{
	res.json({
		status:false,
		message:'Please login'
	});
}
}