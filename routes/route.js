var session = require('express-session');
var bodyParser = require('body-parser');
var courses = require('../controllers/courses');
var trainer = require('../controllers/trainer');
var sms = require('../controllers/sms');
var db = require('../core/db');
var settings = require('../dbConfig');


exports.serve=function(app,express){

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	app.get('/',function(req,resp){
		console.log("in /"+ __dirname);
		resp.sendfile('home.html', {'root': __dirname +'/../public'});
	})

	app.get('/admin',function(req,resp){
		rsp.end();
	});

	app.get('/courses',function(req,resp){
		courses.getCourses(req,resp);
	})

	app.post('/courses',function(req,resp){
		courses.addCourses(req,resp,req.body);
	});

	app.post('/subcategory',function(req,resp){
		//console.log(req.body);
		courses.addSubCourses(req,resp,req.body);
	});

	app.post('/trainer',function(req,resp){
		//console.log(req.body);
		trainer.addTrainer(req,resp,req.body);
	});

	app.get('/trainer/:category',function(req,resp){
		var category = req.params.category;
		trainer.getAllTrainer(req,resp,category);
	});	

	app.put('/trainer/:category/:id',function(req,resp){
		var id = req.params.id;
		var category = req.params.id;
		trainer.updateTrainer(req,resp,id,category,req.body);
	})

	app.get('/trainer/:category/:id',function(req,resp){
		var id = req.params.id;
		var category = req.params.category;
		trainer.getTrainer(req,resp,id,category);
	})


/**********Image Uploading ***************/
	app.get('/upload',function(req,resp){
		console.log("in /"+ __dirname);
		resp.sendfile('upload.html', {'root': __dirname +'/../public'});
	})

	app.post('/file-upload', function(req, resp) {
		settings.upload(req,resp,function(err) {
	        if(err) {
	        		console.log(err);
	            return resp.end("Error uploading file.");
	        }
	        resp.end("File is uploaded");
	    });
	});
/***********************************/

	app.post('/sms',function(req,resp){
		sms.sendSMS(req,resp,req.body);
	})
}

