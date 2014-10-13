'use strict';

angular.module('bolaoDtvApp')
.factory('Partida', function Partida($http,$q, $cacheFactory) {

	return {
		initialize : function($scope,eCadastroPartida){
			var defer = $q.defer();

			$http.get('/api/times',{cache:true}).success(function(times){
				$scope.times = times;
			})
			.then(function(){
				$http.get('/api/partidas').success(function(partidas) {
					$scope.eCadastroPartida = eCadastroPartida == null ? false : eCadastroPartida;
					defer.resolve(partidas);
				});
			})

			return defer.promise;
		},

		getCacheList : function(){
			return $cacheFactory.get('fases') == null ? $cacheFactory('fases') : $cacheFactory.get('fases');
		},

		salvarResultados : function(partidas){
			return $http.post('/api/partidas/resultados',partidas);
		}
	}
});
