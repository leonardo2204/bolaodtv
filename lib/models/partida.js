'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var partidaSchema = new Schema({
	time1 : { type : Schema.Types.ObjectId, ref:'Times' },
	time2 : { type : Schema.Types.ObjectId, ref:'Times'},
	fase : Number,
	resultado : [Number]
});

mongoose.model('Partida', partidaSchema);