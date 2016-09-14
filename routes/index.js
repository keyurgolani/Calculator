var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function validateInput(req,res,callback) {
	var valid = true;
	var value1 = req.param('value1');
	var value2 = req.param('value2');
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
	value1 = Number(req.param('value1'));
	value2 = Number(req.param('value2'));
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
	callback(req,res,value1,value2,valid);
}

router.get('/add', function(req, res, next) {
	validateInput(req,res,function(req,res,value1,value2,valid) {
		if(valid) {
			res.render('index', {
				title : 'Calculator',
				result: (value1 + value2)
			},
			function(err, result) {
				if (!err) {
					res.end(result);
				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	});
});

router.get('/subtract', function(req, res, next) {
	validateInput(req,res,function(req,res,value1,value2,valid) {
		if(valid) {
			res.render('index', {
				title : 'Calculator',
				result: (value1 - value2)
			},
			function(err, result) {
				if (!err) {
					res.end(result);
				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	});
});

router.get('/multiply', function(req, res, next) {
	validateInput(req,res,function(req,res,value1,value2,valid) {
		if(valid) {
			res.render('index', {
				title : 'Calculator',
				result: (value1 * value2)
			},
			function(err, result) {
				if (!err) {
					res.end(result);
				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	});
});

router.get('/divide', function(req, res, next) {
	validateInput(req,res,function(req,res,value1,value2,valid) {
		if(valid) {
			res.render('index', {
				title : 'Calculator',
				result: (value1 / value2)
			},
			function(err, result) {
				if (!err) {
					res.end(result);
				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	});
});

module.exports = router;