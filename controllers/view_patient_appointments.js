var connection = require('./../config');
var express=require('express');
var router=express.Router();
//patient_id must come from session
module.exports.patient_appointments=function(req,res){

	if(req.session.user_id){
		connection.query("select department_name,firstname,lastname,time,date from appointments inner join doctor on doctor.doctor_id=appointments.doctor_id inner join login on doctor.user_id_ref=login.user_id inner join department on department.department_id=doctor.department_id where patient_id=? and active=1",[req.body.patient_id],function(errormain,resultmain,fieldmain){
			if(errormain){res.json({message: "Something went wrong!!"});}
		else{
			res.json({
			status:true,
			message:resultmain});
		}
	});
}
else{
		res.json({message: "Please login."});
	}
}