var express = require('express');
var router = express.Router();

/* Get the default connection */
var mongoose = require('mongoose');
var db = mongoose.connection;

var bcrypt = require('bcrypt');
var saltRounds = 10;

db.on('error', function (err) {
console.log('Mongodb connection error', err);
});

db.once('open', function () {
console.log('connected.');
});

/* GET signup page */
router.get('/',function(req,res){
	res.render('signup', {layout: false});
});

var userSchema = mongoose.Schema({
	name : String,
	email : String,
	password : String
});
var userModel = mongoose.model('userModel',userSchema);

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
	
	var password_hash;
	
	console.log(name);
	console.log(email);
	console.log(password);
	console.log(confirm_password);
	
	
	var result;
	
	result = new RegExp("[a-zA-Z0-9]{6,40}").test(name);
	
	if(result == false){
		res.json({ validation: 'false' , message: ' Please enter valid details ' });
	}else{
		result = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}").test(email);
		
		if(result == false){
			res.json({ validation: 'false' , message: ' Please enter valid details ' });
		}else{
			result = new RegExp("(?=.*\\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[@#$%]+)[a-zA-Z0-9@#$%]{8,20}").test(password);
	
			if(result == false){
				res.json({ validation: 'false' , message: ' Please enter valid details ' });
			}else{
				if(password != confirm_password){
				
					res.json({ validation: 'false' , message: ' Please enter valid details ' });
				
				}else{

					bcrypt.hash(password,saltRounds,function(err,hash){
						
						if(err){
							res.json({ validation: 'false' , message: ' Oops! Something went wrong! ' });
						}
					});
					
					var details = new userModel({name: name, email: email, password: password});

					details.save(function(err,details){
										console.log("C");
						if(err){
							res.json({ validation: 'false' , message: ' Oops! Something went wrong! ' });
						}
					});

					userModel.find(function(err,users){

					if(err){
					console.log("ERrror");
					}
					console.log(users);
					});




					res.json({ validation: 'true', message: ' Signup successful check your mailbox to validate your account '});	
				}
			}
		}
	}

});


module.exports = router;
