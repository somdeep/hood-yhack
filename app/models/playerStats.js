var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema(
        {
            playerId: String,
            matchId: String,
            points: String,
            rebounds: String,
            steals: String,
            assists: String,
            isMvp: Boolean
		},
        { strict: false}
);

module.exports = mongoose.model('playerStats', dbSchema);
