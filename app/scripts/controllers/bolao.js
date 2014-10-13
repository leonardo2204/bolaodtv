'use strict';

angular.module('bolaoDtvApp')
.controller('BolaoCtrl', function ($scope,$filter, Partida, Palpite) {
	
	$scope.palpite = {};
	$scope.partidasOriginal = undefined;
	var isShowingError = false;
	$scope.sendBtnEnabled = true;

	$scope.init = function(eCadastroPartida){
		Partida.initialize($scope,false)
		.then(function(partidas){
			Palpite.initialize($scope,partidas).
			then(function(){
				$scope.partidasOriginal = partidas;
				$scope.setFase(9);
			});
		});
	}

	function setPartidasEditableByDate(fase){
		var now = new Date();
		var dataFase = undefined;
		
		switch(fase){
			case 1:
			dataFase = new Date("June 12, 2014 17:00:00");
			break;
			case 2:
			dataFase = new Date("June 17, 2014 16:00:00");
			break;
			case 3:
			dataFase = new Date("June 23, 2014 13:00:00");
			break;
			case 8:
			dataFase = new Date("June 28, 2014 14:00:00");
			break;
			case 9:
			dataFase = new Date("July 08, 2014 17:00:00");
			break;
		}

		$scope.partidasEnabled = (now.setHours(now.getHours() + 1) > dataFase);
	}

	$scope.setFase = function(fase){
		$scope.fase = fase;
		$scope.applyFilter(fase);
		setPartidasEditableByDate(fase);
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
		Palpite.salvar($scope.palpite).success(function(res){

			angular.forEach(res, function(key,value){
				$scope.palpite[key['partida']]._id = key['_id'];
			});

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

});
