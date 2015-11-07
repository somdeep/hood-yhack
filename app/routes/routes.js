
var mongoose = require('mongoose');

var playerProfile = require('./../models/playerProfile');
var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {
	//Insert my tweet
	//Send the home page - for all other requests
    app.get('/*', function(req,res) {
        res.sendfile('public/html/home.html');
    });
	


};
