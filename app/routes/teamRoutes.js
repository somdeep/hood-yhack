var mongoose = require('mongoose');

var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {
    app.get('/team', function(req,res) {
        res.json({'success':'team yayyyy'});
    });
};