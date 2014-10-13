var mongoose = require('mongoose'),
    Times = mongoose.model('Times');

exports.create = function(req,res,next){

	var time = new Times(req.body);

	time.save(function(err,res){
		if(err) next(err);
		res.json('ok');
	});
}

exports.getAll = function(req,res,next){

	Times.find({},function(err,times){
		if(err) next(err);

		res.json(times);
	});
}