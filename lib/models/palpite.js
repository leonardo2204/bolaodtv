'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var palpiteSchema = new Schema({
	userId : { type : Schema.Types.ObjectId, ref:'User' },
	partida : { type : Schema.Types.ObjectId, ref:'Partida' },
	placar : [Number],
	contabilizado : {type:Boolean, default:false},
	quesito : String
});

mongoose.model('Palpite', palpiteSchema);