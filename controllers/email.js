
var httpMsgs = require('../core/httpMsgs');
var db = require('../core/db');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: 'testandtrain.kol@gmail.com',
        pass: 'testandtrain'
    }
});



exports.sendEmail = function(req,resp,body){
    var mailOptions =({
        to: 'testandtrain.kol@gmail.com', // list of receivers
        subject: "FeedBack", // Subject line
        html: "<b>Sender Email: "+body.Email+"      Message Body: \n  "+body.Body+"</b>" // html body
    });

    smtpTransport.sendMail(mailOptions, function(err, response){
        if(err){
            console.log(err);
            httpMsgs.show500(req,resp,err);
        }else{
            httpMsgs.send200(req,resp);
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();

    });
}


exports.sendSMSEmail = function(req,resp,body){

    var mailOptions =({
        to: 'testandtrain.kol@gmail.com', // list of receivers
        subject: "SMS", // Subject line
        html: "Message has been successfully sent to: <b>"+body.mobile+"</b>  For trainer name: <b>"+body.Name+"</b> for service: <b>"+body.serviceType+"</b> Trainer Phone no: <b>"+body.phone+"</b> Trainer Area: <b>"+body.area+"</b> Trainer Fees: <b>"+body.Fees+"</b> Requested date: <b>"+body.reqDate+"</b>" // html body
    });

    smtpTransport.sendMail(mailOptions, function(err, response){
        if(err){
            console.log(err);
            httpMsgs.show500(req,resp,err);
        }else{
            httpMsgs.send200(req,resp);
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();

    });
}