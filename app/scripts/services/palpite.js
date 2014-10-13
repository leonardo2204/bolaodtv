'use strict';

angular.module('bolaoDtvApp')
.factory('Palpite', function Palpite($rootScope, $http, $q) {
	var user = $rootScope.currentUser;

	return{
		initialize : function($scope, partidas){
			var defer = $q.defer();
			this.get().then(function(palpites){

				angular.forEach(palpites.data, function(key,value){
					$scope.palpite[key['partida']] = key;
				});
				var palpiteLength = palpites.data.length;
				
				if(partidas.length > palpiteLength){
					for(var i = 0; i < partidas.length - palpiteLength ; i++){
						$scope.palpite[partidas[palpiteLength + i]._id] = {};
						$scope.palpite[partidas[palpiteLength + i]._id].placar = [];
						$scope.palpite[partidas[palpiteLength + i]._id].partida = partidas[palpiteLength + i]._id;
					}
				}
				defer.resolve();
			});
			return defer.promise;
		},

		salvar : function(palpites){
			palpites.userId = user.id;
			return $http.post('/api/palpites',palpites);
		},

		get : function(){
			return $http.get('/api/palpites/user/'+user.id);
		}
	}
});
