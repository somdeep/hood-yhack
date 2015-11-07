var mongoose = require('mongoose');

var playerProfile = require('./../models/playerProfile');

module.exports = function(app) {
    app.get('/player', function(req,res) {
        res.json({'success':'player yayyyy'});
    });
};