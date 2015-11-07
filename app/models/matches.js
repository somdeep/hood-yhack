var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema(
    {
        id: String,
        team1Id: String,
        team2Id: String,
        date: Date,
        place: String,
        team1Score: Number,
        team2Score: Number,
        photos: Array,
        mvp1Id: String,
        mvp2Id: String
    },
    { strict: false}
);

module.exports = mongoose.model('matches', dbSchema);
