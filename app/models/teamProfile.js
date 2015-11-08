var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dbSchema = new Schema(
        {
            name: String,
            warCry: String,
            teamMembers: Array,
            hood: String,
            captain:Object,
            stats:
                {
                    wins: Number,
                    losses: Number,
                    averageVictoryMargin: Number,
                    homeWins: Number,
                }
        },
        { strict: false}
);

module.exports = mongoose.model('teamProfile', dbSchema);
