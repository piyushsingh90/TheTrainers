var twilio = require('twilio');
var httpMsgs = require('../core/httpMsgs');
var db = require('../core/db');
var ObjectId = require('mongodb').ObjectID;
var client = new twilio.RestClient('ACb0a2f9b17f5cc4ed476c82fb96ff3d22', '333b7feac49ca6437a2092ead4b734cc');

exports.sendSMS = function(req,resp,body){
    client.sms.messages.create({
        to: "+91"+body.mobile,
        from:'+12565705851',
        body:"Greetings from TestndTrain!. Name:"+ body.Name+"; Service:"+body.serviceType+"; Fees:"+body.Fees+"; Area:"+body.area+"; Phone:"+body.phone+"; NoOfClasses:"+body.noOfClasses
        }, function(err, message) {
            if (!err) {
                body._id = new ObjectId(body._id);
                db.dbs.collection('Sms').insert(body,function(err,result){
                    if(err){
                        db.dbs.collection('Logs').insert({err:err},function(err,result){
                            if(err){
                                console.log("Error in logging");  
                            }
                        });
                    }
                });
                httpMsgs.send200(req,resp);
            }
            else {
                db.dbs.collection('Logs').insert({err:err},function(err,result){
                    if(err){
                        console.log("Error in logging");  
                    }
                });
                httpMsgs.show500(req,resp,err);
            }
        });
}