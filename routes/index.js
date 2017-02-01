var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  if (req.user){
 	res.render('index', { 
 			user: req.user,
 		 	title: 'Express' 
 		});
 	}
 	else{
 		res.redirect('/auth/login');
 	}
=======
	if (req.user){
		res.render('index', { 
			user: req.user,
		 	title: 'Express' 
		});
	}
	else{
		res.redirect('/auth/login');
	}
>>>>>>> 011d97f9edaafd2a92dc4bcfcc044dbd3258ab89
});

module.exports = router;
