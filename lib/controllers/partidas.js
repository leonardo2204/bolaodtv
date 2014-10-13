var mongoose = require('mongoose'),
Partida = mongoose.model('Partida');

exports.create = function(req,res,next){
	var partida = new Partida(req.body);

	partida.save(function(err,partidaBd){
		if(err) next(err);

		Partida.findById(partidaBd._id)
		.populate('time1')
		.populate('time2')
		.exec(function(err,partida){
			if(err) next(err);
			res.json(partida);
		});
	});
}    

exports.salvarResultados = function(req,res,next){
	var resultados = req.body;

	for(resultado in resultados){

		Partida.findByIdAndUpdate(resultados[resultado]._id,{$set : {resultado : resultados[resultado].resultado}}, function(saida){
		});

	}

	res.json('ok');
}

exports.getAll = function(req,res,next){

	Partida.find({})
	.populate('time1')
	.populate('time2')
	.sort({_id : 1})
	.exec(function(err,partidas){
		if(err) next(err);
		res.json(partidas);
	});

}