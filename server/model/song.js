var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Song = new Schema({
	name:{type: String, require: true},
	artist:{type: String, require: true},
	genre:{type: String, require: true},
	age:{type: Number},
	duration:{type: String},
	album:{type: String},
	score:{type: Number, require: true},

});
module.exports = mongoose.model('Song', Song);