var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');


exports.getCourses = function(req,resp){
	db.dbs.collection("courses").find().toArray(function(err,result){
							if(err){
								httpMsgs.show500(req,resp,err);
							}						
							else{
								httpMsgs.sendJson(req,resp,result);
							}
	});
};


exports.addCourses = function(req,resp,reqBody){
	db.dbs.collection("courses").find({category:reqBody.category}).toArray(function(err,data){
		if(!err && data.length==0){
			db.dbs.collection("courses").insert(reqBody,function(err,result){
				if(err){
					httpMsgs.show500(req,resp,err);
				}						
				else{
					httpMsgs.send200(req,resp);
				}
			});
		}
		else{
			httpMsgs.customError(req,resp,err,data);
		}
	})
};


exports.addSubCourses = function(req,resp,reqBody){
	db.dbs.collection("courses").find({subCategory:reqBody.subCategory}).toArray(function(err,data){
		if(!err && data.length==0){
			db.dbs.collection("courses").update({category:reqBody.category},{$pushAll:{subCategory:[reqBody.subCategory]}},function(err,result){
				if(err){
					httpMsgs.show500(req,resp,err);
				}						
				else{
					httpMsgs.send200(req,resp);
				}
			});
		}
		else{
			httpMsgs.customError(req,resp,err,data);
		}
	})
};


