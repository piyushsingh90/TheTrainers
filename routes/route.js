var session = require('express-session');
var bodyParser = require('body-parser');
var courses = require('../controllers/courses');
var trainer = require('../controllers/trainer');
var db = require('../core/db');

exports.serve=function(app,express){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/admin',function(req,resp){
		resp.end();
	});

	app.get('/courses',function(req,resp){
		courses.getCourses(req,resp);
	})

	app.post('/courses',function(req,resp){
		courses.addCourses(req,resp,req.body);
	});

	app.post('/subcategory',function(req,resp){
		console.log(req.body);
		courses.addSubCourses(req,resp,req.body);
	});

	app.post('/trainer',function(req,resp){
		console.log(req.body);
		trainer.addTrainer(req,resp,req.body);
	});

	app.get('/trainer',function(req,resp){
		console.log(req.body);
		trainer.addTrainer(req,resp,req.body);
	});

	app.get('/',function(req,resp){
		console.log("in /");
		db.dbs.collectionNames({name:1},function(err,data){
		console.log(data);

		})

	})
		


}
/*
exports.serve=function(app,express){
	var sess;
	app.use(session({secret: 'ssshhhhh'}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use('/',express.static(__dirname+'/../Angular'));

	app.get('/',function(req,res){
		sess=req.session;
		console.log(__dirname);
		res.sendFile('index.html',{root: __dirname + '/../Angular'});

	})
//************* User Request ***************
	app.get('/users',function(req,resp){
		sess=req.session;
		user.getList(req,resp);
	});
}


*/
