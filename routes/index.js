var express = require('express');
var router = express.Router();
var logger = require("../utils/logger");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  });
});

function validateInput(req,res,callback) {
	logger.log('info', 'Validating input');
	var valid = true;
	var value1 = req.body.value1;
	var value2 = req.body.value2;
	if(value1 === "" || value2 === "" || value1 === undefined || value2 === undefined || value1 === null || value2 === null) {
		res.send({
			"error": "Empty Operands..!!"
		})
		valid = false;
	}
	value1 = Number(value1);
	value2 = Number(value2);
	if(isNaN(value1) || isNaN(value2)) {
		//TODO: Send error message here.
		valid = false;
	}
	logger.log('info', 'Validated values ' + value1 + ' and ' + value2);
	logger.log('info', 'Result ' + valid);
	callback(value1,value2,valid);
}

router.post('/add', function(req, res, next) {
	logger.log('info', 'Inside Add Method');
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			logger.log('info', 'Adding values');
			res.send({
				"result": (value1 + value2)
			});
		}
	});
});

router.post('/subtract', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			logger.log('info', 'Subtracting values');
			res.send({
				"result": (value1 - value2)
			});
		}
	});
});

router.post('/multiply', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			logger.log('info', 'Multiplying values');
			res.send({
				"result": (value1 * value2)
			});
		}
	});
});

router.post('/divide', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		logger.log('info', 'Dividing values');
		if(valid) {
			res.send({
				"result": (value1 / value2 == Infinity ? "Infinity" : value1 / value2 == -Infinity ? "-Infinity" : value1 / value2)
			});
		}
	});
});

module.exports = router;