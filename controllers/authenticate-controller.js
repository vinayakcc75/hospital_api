var connection = require('./../config');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
module.exports.authenticate=function(req,res){
	var choice=req.body.choice;
    var username=req.body.username;
    var password=req.body.password;
	var sql='SELECT user_id,firstname,lastname,user_type,phone,email FROM login WHERE '+ choice +' = "'+ username+'" and password = "'+password+'";';
    connection.query(sql,function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
			title: error,
            message:"There is something wrong with the query"
            })
      }
      else if(results.length===0){
        res.json({
          status:false,
          message:"Wrong"
          })
      }
      else{
        if(results.length >0){
			if(results[0].user_type==1){
				connection.query('select doctor_id from doctor where user_id_ref=?',[results[0].user_id],function(errord,resultsd,fieldsd){
					if(errord){
					res.json({
				status:false,
				title: errord,
				message:"There is something wrong with the query"
            });	
					}
			else{
        req.session.user_id=resultsd[0].doctor_id;
        req.session.user_id_ref=results[0].user_id;
        req.session.user_type=results[0].user_type;

        res.json({
          results,
          resultsd,
          status:true,
          message:'User authenticated',
        })
			}
				});
				
				
			}
			else{
        req.session.user_id=results[0].user_id;
        req.session.user_type=results[0].user_type;

        res.json({
          results,
            status:true,
            message:'User authenticated',

        });
			}
			
                
            /*}else{
                res.json({
                  status:false,
                  message:"Username and password does not match"
                 });
            }*/
         
        }
       /* else{
          res.json({
              status:false, 			  
            message:"username does not exits "
          });
        }*/
      }
    });
}