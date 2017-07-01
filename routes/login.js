var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/',function(req,res,next){
	res.render('login', {layout: false});
});


router.post('/',function(req,res,next){

	var email = req.body.user;
	var password = req.body.password;
	


});


module.exports = router;
