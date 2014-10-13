'use strict';

angular.module('bolaoDtvApp')
.factory('Rankingpartida', function Rankingpartida($http) {

	var PartidaRanking = function(userId, quesito) {
		this.items = [];
		this.busy = false;
		this.page = 1;
		this.userId = userId;
		this.quesito = quesito;
	};

	PartidaRanking.prototype.nextPage = function() {
		if (this.busy) return;
		this.busy = true;

		var url = "/api/ranking/user/"+ this.userId + "/quesito/"+ this.quesito + "/page/"+ this.page;
		$http.jsonp(url).success(function(data) {
			var items = data.data;
			for (var i = 0; i < items.length; i++) {
				this.items.push(items[i].data);
			}
			this.page++;
			this.busy = false;
		}.bind(this));
	};

	return PartidaRanking;

});
