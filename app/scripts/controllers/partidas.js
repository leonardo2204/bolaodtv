'use strict';

angular.module('bolaoDtvApp')
.controller('PartidasCtrl', function ($scope, $http,$rootScope, $filter, $cacheFactory, Partida) {

	$scope.novaPartida = {};
	$scope.partidas = {};
	$scope.time1 = undefined;
	$scope.time2 = undefined;
	var isShowingError = false;
	$scope.sendBtnEnabled = true;

	$scope.partidasOriginal = undefined;

	$scope.init = function(eCadastroPartida){
		Partida.initialize($scope,eCadastroPartida).then(function(partidas){
			$scope.partidasOriginal = partidas;		
			$scope.setFase(1);
		});
	}

	$scope.setFase = function(fase){
		$scope.fase = fase;
		$scope.applyFilter(fase);
	}

	$scope.applyFilter = function(type) {
		var cached = Partida.getCacheList().get(type);
		if (cached){
			$scope.partidas = cached;
		} else { 
			Partida.getCacheList().put(type,$filter('filter')($scope.partidasOriginal,{fase : type}));
			$scope.partidas = Partida.getCacheList().get(type);
		}
	}

	$scope.salvar = function(){
		$scope.sendBtnEnabled = false;
		Partida.salvarResultados($scope.partidasOriginal).success(function(res){

			$scope.sendBtnEnabled = true;
			
			if(isShowingError) return;

			isShowingError = true;
			$(".alert").show();

			$('html, body').animate({
				scrollTop: $(".alert").offset().top - 60
			}, 1000);

			window.setTimeout(function() {
				$(".alert").fadeTo(1500, 0).slideUp(500, function(){
					$(this).css({'opacity': 1});
					isShowingError = false;
				});
			}, 6000);
		});
	}

	$scope.salvarPartida = function(){
		var user = $rootScope.currentUser;
		Partida.getCacheList().remove($scope.fase);
		$scope.novaPartida = {time1 : $scope.time1._id, time2 : $scope.time2._id, fase:$scope.fase, userId: user.id }

		$http.post('/api/partidas',$scope.novaPartida).success(function(partidaSalva){
			$scope.partidasOriginal.push(partidaSalva);
			$scope.applyFilter($scope.fase);
			$scope.novaPartida= undefined;
			$scope.time1 = undefined;
			$scope.time2 = undefined;
		});	
	}

});
