var connection = require('./../config');
var express=require('express');

function get_data(user_id,callback){
	connection.query("select experience,qualification,specialization,department_name from doctor inner join department on doctor.department_id=department.department_id where user_id_ref=?",[user_id],function(error,result,field){
							if(error){
								return false;
							}
							else{
								//console.log(result);
								return callback(result[0]);
							}
				
					});
}

//user_id will come from session value
module.exports.profile=  function(req,res){
	if(req.session.user_id){
	//var user_id=req.session.user_id;
	
	var here=(req.session.user_type===1)?req.session.user_id_ref:req.session.user_id;
	connection.query("select user_type,email,phone,age,gender,address,firstname,lastname from login where user_id=?",[here],function(errormain,resultmain,fieldmain){
			if(errormain){res.json({message:"Something went wrong!!"})}
			else{ 
                    if(req.session.user_type===1){
					get_data(req.session.user_id_ref, function(result){
									//answer =  result;
									res.json({
									status:true,
									message:resultmain,
									message2:result
					})
							});}
							else{
								res.json({
									status:true,
									message:resultmain,
								})
							}
			}
		})

	}
	else{
		res.json({message: "Please login."});
	}
}