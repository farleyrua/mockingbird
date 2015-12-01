var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recommendation = new Schema({	
	date:{ type: Date },
	song:{
		name:{type: String, require: true},
		artist:{type: String, require: true},
		genre:{type: String, require: true},
		age:{type: Number},
		duration:{type: String},
		album:{type: String},
		score:{type: Number, require: true}
	}		
});
Recommendation.pre('save', function(next){
  now = new Date();
  this.date = now;
  if ( !this.date ) {
    this.date = now;
  }
  next();
});
module.exports = mongoose.model('Recommendation', Recommendation);