var mongoose = require('mongoose');

var teamStats = require('./../models/teamStats');
var playerStats = require('./../models/playerStats');


module.exports = function(app) {
    app.get('/stats', function(req,res) {
        res.json({'success':'Stats yayyyy'});
    });
};