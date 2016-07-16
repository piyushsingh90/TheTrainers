var multer  = require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/assets/images');
  },
  filename: function (req, file, callback) {
  	console.log(file);
    callback(null, file.originalname);
  }
});

exports.upload = multer({ storage : storage}).single('userPhoto');

exports.url ='mongodb://TECHUSER:TECHUSR@ds017175.mlab.com:17175/testandtrain';

//exports.url = 'mongodb://localhost:27017/trainers';

exports.webPort = 9001;

exports.httpMsgsFormat = "JSON";
