var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});

db.once('open', function () {
console.log('connected.');
});

/* GET signup page */
router.get('/',function(req,res){
	res.render('signup', {layout: false});
});


var Schema = mongoose.Schema;
var userSchema = new Schema({
	name : String,
	email : String,
	password : String,
	isAlive : Boolean
});

/* POST signup page */
router.post('/',function(req,res,next){
	next();
});

router.use('/',function(req,res){
	
	console.log(req.body);
	
	var name = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var confirm_password = req.body.confirm_password;
	
	console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);
	
	
	var result;
	
	result = new RegExp("[a-zA-Z0-9]{6,40}").test(name);
	
	if(result == false){
		res.send("false");
	}else{
		result = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}").test(email);
		
		if(result == false){
			res.send("false");
		}else{
			result = new RegExp("(?=.*\\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[@#$%]+)[a-zA-Z0-9@#$%]{8,20}").test(password);
	
			if(result == false){
				res.send("false");
			}else{
				if(password != confirm_password){
					res.send("false");
				}else{
					res.send("true");	
				}
			}
		}
	}

	
});


module.exports = router;
