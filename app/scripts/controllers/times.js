'use strict';

angular.module('bolaoDtvApp')

.controller('TimesCtrl', function ($scope, $http) {

	$scope.time = {};
	$scope.incNum = 11;

	$http.get('/api/times').success(function(times){
		$scope.times = times;
	});

$scope.salvarTime = function(){
	$scope.time.imgNumber = $scope.incNum;
	$scope.incNum++;
	$http.post('/api/times', $scope.time).success(function(res) {
		$scope.time = {};
	});
}

});