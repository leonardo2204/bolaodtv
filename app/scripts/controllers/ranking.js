'use strict';

angular.module('bolaoDtvApp')
.controller('RankingCtrl', function ($scope, $http) {
	
	
	
	$http.get('/api/ranking').success(function(ranking){
		$scope.rankings = ranking;
	})
	
});
