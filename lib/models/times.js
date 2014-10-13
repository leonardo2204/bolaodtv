'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var timeSchema = new Schema({
	nome :String,
	imgNumber : Number
});

mongoose.model('Times', timeSchema);