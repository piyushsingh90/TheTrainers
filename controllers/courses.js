var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');


exports.getCourses = function(req,resp){
	db.dbs.collection("courses").find().toArray(function(err,result){
							if(err){
								httpMsgs.show500(req,resp,err);
							}						
							else{
								console.log(result);
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




/*
		db.dbs.collection("courses").insert(reqBody,function(err,result){
			if(err){
				httpMsgs.show500(req,resp,err);
			}						
			else{
				httpMsgs.send200(req,resp);
			}
		});*/

/*
exports.get = function(req,resp,empno){
	var quer= "select * from user where user_id="+empno;
	db.executeSql("select * from user where user_id="+empno,function(err,data){
		if(err){
			httpMsgs.show500(req,resp,err);
		}	
		else{
			httpMsgs.sendJson(req,resp,data);
		}
	})
};

exports.add = function(req,resp,reqBody){
	
	try{
		if(!reqBody) throw new Error("Input not Valid");
		if(reqBody){
			validate.newUserValidation(reqBody.Email,reqBody.Phone,function(err,data){
				if(!err && !data){
					var sql = "insert into user(FName,LName,Email,Password,UserType_id,Address,Phone,Pincode) values";
					sql += util.format("('%s','%s','%s','%s','%d','%s','%s','%s');", reqBody.FName,reqBody.LName,reqBody.Email,reqBody.Password,1,reqBody.Address,reqBody.Phone,reqBody.Pincode);
					db.executeSql(sql,function(err,data){
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
			});
		}
		else{
			throw new Error("Input not Valid");
		}
	}
	catch(ex){
		console.log("Exception");
		httpMsgs.show500(req,resp,ex);
	}
};

exports.update = function(req,resp,reqBody){

};

exports.delete = function(req,resp,reqBody){

};

exports.login = function(req,resp,reqBody){

};

*/