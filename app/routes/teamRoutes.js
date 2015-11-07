var mongoose = require('mongoose');

var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {


//CRUD for team


//getTeam
    app.get('/getTeam', function(req,res) {

      teamProfile.find({},function(err,data){

        if(err) res.send(err);

        res.json(data);



      }

    });






};
