'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
mongoosePaginate = require('mongoose-paginate');

var rankingSchema = new Schema({
	userId : { type : Schema.Types.ObjectId, ref:'User' },
	pontos : {type: Number, default:0},
	placarExato : {type: Number, default:0},
	golVencedor : {type: Number, default:0},
	golPerdedor : {type: Number, default:0},
	diferencaVencPerd : {type: Number, default:0},
	empateNaoExato : {type: Number, default:0},
	timeVencedor : {type: Number, default:0}
});


rankingSchema.plugin(mongoosePaginate)
mongoose.model('Ranking',rankingSchema);