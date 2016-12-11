var express = require('express');
var router = express.Router();
var logger = require("../utils/logger");
var soap = require('soap');
var baseURL = "http://localhost:8080/CalculatorWebServices/services/";
var option = {
	ignoredNamespaces : true
};

// MySQL Connection Pooling References
// https://github.com/coopernurse/node-pool
// http://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling
// https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

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
		// TODO: Send error message here.
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
			var url = baseURL + "CalculationServices?wsdl";
			soap.createClient(url, option, function(err, client) {
				client.add({
					value1 : value1,
					value2 : value2
				}, function(error, result) {
					if(error) {
						res.send({
							result : "Error"
						});
					} else {
						res.send({
							result : result.addReturn
						});
					}
				});
			});
		}
	});
});

router.post('/subtract', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			logger.log('info', 'Subtracting values');
			var url = baseURL + "CalculationServices?wsdl";
			soap.createClient(url, option, function(err, client) {
				client.subtract({
					value1 : value1,
					value2 : value2
				}, function(error, result) {
					if(error) {
						res.send({
							result : "Error"
						});
					} else {
						res.send({
							result : result.subtractReturn
						});
					}
				});
			});
		}
	});
});

router.post('/multiply', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		if(valid) {
			logger.log('info', 'Multiplying values');
			var url = baseURL + "CalculationServices?wsdl";
			soap.createClient(url, option, function(err, client) {
				client.multiply({
					value1 : value1,
					value2 : value2
				}, function(error, result) {
					if(error) {
						res.send({
							result : "Error"
						});
					} else {
						res.send({
							result : result.multiplyReturn
						});
					}
				});
			});
		}
	});
});

router.post('/divide', function(req, res, next) {
	validateInput(req,res,function(value1,value2,valid) {
		logger.log('info', 'Dividing values');
		if(valid) {
			if(value2 == 0) {
				res.send({
					"result": "Infinity"
				});
			} else {
				var url = baseURL + "CalculationServices?wsdl";
				soap.createClient(url, option, function(err, client) {
					client.divide({
						value1 : value1,
						value2 : value2
					}, function(error, result) {
						if(error) {
							res.send({
								result : "Error"
							});
						} else {
							res.send({
								result : result.divideReturn
							});
						}
					});
				});
			}
		}
	});
});

module.exports = router;