var mongoose = require('mongoose'),
Palpite = mongoose.model('Palpite'),
Q = require('q');

exports.create = function(req,res,next){

	var palpites = req.body;
	var promises = [];

	for (var palpite in palpites) {
		if(palpite == 'userId') continue;

		if(palpites[palpite].contabilizado)
			continue;

		var defer = Q.defer();

		var id = palpites[palpite]._id;
		delete palpites[palpite]._id;

		if(!id)
			id = new mongoose.Types.ObjectId();

		palpites[palpite].userId = palpites['userId'];
		palpites[palpite].contabilizado = false;

		Palpite.findByIdAndUpdate(id, palpites[palpite], {upsert:true},function(err,updated){
			if(err) defer.reject(err);
			defer.resolve();
		});

		promises.push(defer);
	}

	Q.all(promises).then(function(){
		Palpite.find({userId:palpites['userId']}, function(err,palpites){
			res.json(palpites);
		})
	}, function(err){
		return next(err);
	});
}

exports.getByUser = function(req,res,next){

	var userId = req.params.id;

	Palpite.find({userId: userId}, function(err,palpites){
		if(err) return next(err);
		res.json(palpites);
	});

}
