var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  });
});

function validateInput(req,res,callback) {
	var valid = true;
	var value1 = req.body.value1;
	var value2 = req.body.value2;
	if(value1 === "" || value2 === "" || value1 === undefined || value2 === undefined || value1 === null || value2 === null) {
		res.render('index', {
			error : 1,	//TODO: Error 1 = Values not added
		},
		function(err, result) {
			if (!err) {
				res.end(result);
			} else {
				res.end('An error occurred');
				console.log(err);
			}
		});
		valid = false;
	}
	value1 = Number(value1);
	value2 = Number(value2);
	if(isNaN(value1) || isNaN(value2)) {
		res.render('index', {
			error : 2,	//TODO: Error 2 = Not a number
		},
		function(err, result) {
			if (!err) {
				res.end(result);
			} else {
				res.end('An error occurred');
				console.log(err);
			}
		});
		valid = false;
	}
	callback(value1,value2,valid);
}

router.post('/add', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			res.send({
				"result": (value1 + value2)
			});
		}
	});
});

router.post('/subtract', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			res.send({
				"result": (value1 - value2)
			});
		}
	});
});

router.post('/multiply', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			res.send({
				"result": (value1 * value2)
			});
		}
	});
});

router.post('/divide', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			res.send({
				"result": (value1 / value2 == Infinity ? "Infinity" : value1 / value2)
			});
		}
	});
});

module.exports = router;