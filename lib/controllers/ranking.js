var mongoose = require('mongoose'),
Ranking = mongoose.model('Ranking'),
Palpite = mongoose.model('Palpite'),
q = require('q');

function comparision(val1, val2, userId,partidaId){
	var time1 = {};
	var time2 = {};
	var time1User = {};
	var time2User = {};

	time1.gols = val1[0];
	time2.gols = val1[1];

	time1User.gols = val2[0];
	time2User.gols = val2[1];

	if(time1.gols > time2.gols){
		time1.vencedor = true;
		time2.vencedor = false;
	}else if(time1.gols < time2.gols){
		time1.vencedor = false;
		time2.vencedor = true;
	}else{
		time1.vencedor = false;
		time2.vencedor = false;
	}

	if(time1User.gols > time2User.gols){
		time1User.vencedor = true;
		time2User.vencedor = false;
	}else if(time1User.gols < time2User.gols){
		time1User.vencedor = false;
		time2User.vencedor = true;
	}else{
		time1User.vencedor = false;
		time2User.vencedor = false;
	}

	var ranking = new Ranking();
	ranking.userId = userId;

	if(time1.gols == time1User.gols && time2.gols == time2User.gols){
		ranking.pontos = 25;
		ranking.placarExato = 1;
		ranking.quesito = 'placarExato';
	}else if((time1.vencedor && time1User.vencedor && (time1.gols == time1User.gols))
		|| (time2.vencedor && time2User.vencedor && (time2.gols == time2User.gols))){
		ranking.pontos = 18;
		ranking.golVencedor = 1;
		ranking.quesito ='golsVencedor';
	}else if((time1.vencedor && time1User.vencedor && (time2.gols == time2User.gols)) 
		|| (time2.vencedor && time2User.vencedor && (time1.gols == time1User.gols))){
		ranking.pontos = 12;
		ranking.golPerdedor = 1;
		ranking.quesito ='golsPerdedor';
	}else if( (time1.vencedor && time1User.vencedor && (time1.gols - time2.gols == time1User.gols - time2User.gols))
		|| (time2.vencedor && time2User.vencedor && (time2.gols - time1.gols == time2User.gols - time1User.gols)) ){
		ranking.pontos = 15;
		ranking.diferencaVencPerd = 1;
		ranking.quesito ='difgols';
	}else if(time1.gols == time2.gols && time1User.gols == time2User.gols){
		ranking.pontos = 15;
		ranking.empateNaoExato = 1;
		ranking.quesito ='emapteNaoExato';
	}else if(time1.vencedor && time1User.vencedor || time2.vencedor && time2User.vencedor){
		ranking.pontos = 10;
		ranking.timeVencedor = 1;
		ranking.quesito ='timeVencedor';
	}


	var update = {$inc:{ pontos : ranking.pontos, placarExato : ranking.placarExato, golVencedor: ranking.golVencedor,
		golPerdedor:ranking.golPerdedor, diferencaVencPerd : ranking.diferencaVencPerd, empateNaoExato : ranking.empateNaoExato,
		timeVencedor :ranking.timeVencedor }};

		return Ranking.update({userId:userId}, update,{upsert:true}).exec()
		.then(function(){
			return Palpite.update({partida:partidaId, userId : userId},{$set : {contabilizado:true}}).exec();
		});
	}

	function calcularPontos(partidas){
		var promises = [];

		partidas.forEach(function(partida){
			var deferred = q.defer();

			var resFinal = partida.partida.resultado;
			var resUser = partida.placar;
			var userId = partida.userId;
			var partidaId = partida.partida._id;

			comparision(resFinal,resUser,userId,partidaId).then(function(res){
				deferred.resolve();
			});

			promises.push(deferred.promise);
		});

		return q.all(promises);
	}

	function mapUser(){
		var defer = q.defer();

		Palpite.find({placar: {$not: {$size: 0}}, contabilizado : false })
		.populate({path : 'partida', select: '_id resultado fase', match: {resultado: {$not: {$size: 0}}}})
		.exec().
		then(function(populated){
			var notNullPartidas = populated.filter(function (p){
				return p.partida != null;
			});

			if(notNullPartidas.length == 0){
				defer.reject('sem partidas validas');
			}

			calcularPontos(notNullPartidas).then(function(res){
				defer.resolve(res);
			});
		});

		return defer.promise;
	}

	exports.calcularRanking = function(req,res,next){
		mapUser()
		.then(function(){
			return Ranking.find().populate({path: 'userId', select: 'name profilePic'}).exec()
			.then(res.json.bind(res))
		},function(err){
			next(err);
		});
	}

	exports.partidasRanking = function(req,res,next){
		var params = req.params;

		Ranking.find({userId: params.userId, 'resumo.quesito' : params.quesito})
		.populate('resumo.partida', 'resultado time1 time2')
		.exec(function(err,saida){
			var filtered = saida.filter(function(p){
				return p.quesito == params.quesito
			});
			res.json(saida);
		})

	}


	exports.get = function(req,res,next){
		Ranking.find().populate({path: 'userId', select: 'name profilePic'}).sort({'pontos':-1, 'placarExato': -1 }).exec()
		.then(res.json.bind(res));
	}