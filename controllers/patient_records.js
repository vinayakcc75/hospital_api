var connection = require('./../config');
var express=require('express');
var router=express.Router();

module.exports.docrecords=function(req,res){
	if(req.session.user_id){
		//session value
		//var user_id=1;
	connection.query("select * from medical_records where patient_id=?",[req.body.pat_id],function(errormain,resultmain,fieldmain){
		if(errormain){res.json({message:errormain});}
		else{
			if (resultmain.length>0){
			res.json({
			status:true,
			message: resultmain});
		}
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