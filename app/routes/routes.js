
var mongoose = require('mongoose');

var playerProfile = require('./../models/playerProfile');
var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {
	//Add the API for player Operations
    require('./playerRoutes')(app);
	//Add the API for team Operations
    require('./teamRoutes')(app);
    require('./playerStat')(app);
    require('./analyticsRoutes')(app);
	//Send the home page - for all other requests
    app.get('/*', function(req,res) {
        res.sendfile('public/html/home.html');
    });
	


};
