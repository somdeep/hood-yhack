var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema({
        name: String,
        teamId: String,
        nickName: String,
        position: String,
        jersey: String,
        hood: String,
        stats:
            {
                points: Number,
                rebounds: Number,
                assists: Number,
                steals: Number,
                mvpCount: Number,
            }
    },
    { strict: false }
);

module.exports = mongoose.model('playerProfile', dbSchema);
