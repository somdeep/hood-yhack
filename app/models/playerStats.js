var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema({
		});

module.exports = mongoose.model('playerStats', dbSchema);