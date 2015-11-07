var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema({
		},{strict:false});

module.exports = mongoose.model('playerProfile', dbSchema);


