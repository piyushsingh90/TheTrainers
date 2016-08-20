var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
  var ObjectId = require('mongodb').ObjectID;

exports.getWorkshopDetails = function(req,resp){
    db.dbs.collection('Workshop').find({date:{$gte:new Date(new Date() - 1 * (24 * 60 * 60 * 1000))}}).toArray(function(err,data){
        if(err){
            httpMsgs.show500(req,resp,err);
        }                       
        else{
            httpMsgs.sendJson(req,resp,data);
        }
    })
}


