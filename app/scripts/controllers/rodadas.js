'use strict';

angular.module('bolaoDtvApp')
.controller('RodadasCtrl', function ($scope, $http, Palpite) {

	$scope.fase = 1;
	$scope.palpite = {};

	$scope.init = function(partidas){
		Palpite.get().success(function(palpites){
			
			angular.forEach(palpites, function(key,value){
				$scope.palpite[key['partida']] = (key);
			});
		});
		//for(var i = 0; i < (partidas.length) ;i++){
		//	$scope.palpite[partidas[i]._id] = {};
		//	$scope.palpite[partidas[i]._id].placar = [];
		//}	
	}

	
	$scope.setFase = function(fase){
		$scope.fase = fase;
	}

	$scope.salvarPalpites = function(){
		Palpite.salvar($scope.palpite).success(function(res){
			
		});
	}
});
