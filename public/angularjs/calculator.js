var calculator = angular.module('calculator', []);
calculator.controller('calculate', function($scope, $http) {
	$scope.add = function() {
		$http({
			method : "POST",
			url : '/add',
			data : {
				"value1" : $scope.value1,
				"value2" : $scope.value2,
			}
		}).success(function(data) {
			$scope.result = data.result;
		}).error(function(error) {
			// Send Error To Front
		});
	};
	
	$scope.sub = function() {
		$http({
			method : "POST",
			url : '/subtract',
			data : {
				"value1" : $scope.value1,
				"value2" : $scope.value2,
			}
		}).success(function(data) {
			$scope.result = data.result;
		}).error(function(error) {
			// Send Error To Front
		});
	};
	
	$scope.mul = function() {
		$http({
			method : "POST",
			url : '/multiply',
			data : {
				"value1" : $scope.value1,
				"value2" : $scope.value2,
			}
		}).success(function(data) {
			$scope.result = data.result;
		}).error(function(error) {
			// Send Error To Front
		});
	};
	
	$scope.div = function() {
		$http({
			method : "POST",
			url : '/divide',
			data : {
				"value1" : $scope.value1,
				"value2" : $scope.value2,
			}
		}).success(function(data) {
			console.log(data.result);
			$scope.result = data.result;
		}).error(function(error) {
			// Send Error To Front
		});
	};
	
	$scope.fillValue = function(number, display) {
		if(Number(display) === 1) {
			if($scope.value1 === undefined) {
				$scope.value1 = number;
			} else {
				if(number === ".") {
					if($scope.value1.indexOf('.') === -1) {
						$scope.value1 = $scope.value1 + number;
					}
				} else {
					$scope.value1 = $scope.value1 + number;
				}
			}
		} else {
			if($scope.value2 === undefined) {
				$scope.value2 = number;
			} else {
				if(number === ".") {
					if($scope.value2.indexOf('.') === -1) {
						$scope.value2 = $scope.value2 + number;
					}
				} else {
					$scope.value2 = $scope.value2 + number;
				}
			}
		}
	};
	
	$scope.clearValue = function(display) {
		if(Number(display) === 1) {
			$scope.value1 = "";
		} else if(Number(display) === 2) {
			$scope.value2 = "";
		} else if(Number(display) === 3) {
			$scope.value1 = "";
			$scope.value2 = "";
			$scope.result = "";
		}
	};
	
	$scope.toggle = function(display) {
		if(Number(display) === 1) {
			if($scope.value1.indexOf('-') === -1) {
				$scope.value1 = "-" + $scope.value1;
			} else {
				$scope.value1 = $scope.value1.replace(/-/g,'');
			}
		} else if(Number(display) === 2) {
			if($scope.value2.indexOf('-') === -1) {
				$scope.value2 = "-" + $scope.value2;
			} else {
				$scope.value2 = $scope.value2.replace(/-/g,'');
			}
		}
	};
	
	$scope.$watch('value1', function() {
		if($scope.value1 === undefined) {
			$scope.value1 = "";
		}
		$scope.value1 = $scope.value1.replace(/(?!^)-/g, '').replace(/\./g, function(match, offset, all) { 
			   return match === "." ? (all.indexOf(".") === offset ? '.' : '') : ''; 
		}).replace(/[^0-9.-]/g,'');
	});
	
	$scope.$watch('value2', function() {
		if($scope.value2 === undefined) {
			$scope.value2 = "";
		}
		$scope.value2 = $scope.value2.replace(/(?!^)-/g, '').replace(/\./g, function(match, offset, all) { 
			   return match === "." ? (all.indexOf(".") === offset ? '.' : '') : ''; 
		}).replace(/[^0-9.-]/g,'');
	});
});