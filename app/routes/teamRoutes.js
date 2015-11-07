var mongoose = require('mongoose');

var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {


//CRUD for team


// getTeams
    app.get('/team/get', function(req,res) {
      teamProfile.find({},function(err,data){
        if(err) res.send(err);
        res.json(data);
      });
    });

// getTeamById
    app.get('/team/get/id/:teamId', function(req, res) {
        teamProfile.find({teamId:req.params.teamId}, function(err, data) {
            if(err) res.send(err);
            res.json(data);
        });
    });

// getTeamByName
    app.get('/team/get/name/:teamName', function(req, res) {
        teamProfile.find({teamName:req.params.teamName}, function(err, data) {
            if(err) res.send(err);
            res.json(data);
        });
    });

// postTeam
    app.post('/team/create', function(req, res) {
        console.log(req.body);

        // schema validation pending
        var newTeam = req.body;
        console.log(newTeam['teamId']);

        teamProfile.create(newTeam, function(err, data) {
            console.log("data", data);
            if(err) res.send(err);
            res.json(data);
        });
    });

// updateTeam
    app.put('/team/update/:teamId', function(req, res) {
        console.log(req.body);

        var updatedTeam = req.body;
        // Id should be genereated by DB as auto
        teamProfile.update({teamId:req.params.teamId}, {$set : updatedTeam}, function(err, data) {
            if(err) res.send(err);

            res.json(data);
        });
    });

// delTeam
    app.delete('/team/delete/:teamId', function(req, res) {
        console.log(req.body);

        teamProfile.remove({teamId:req.params.teamId}, function(err, removed){
            if(err) res.send(err);

            res.json(removed);
        });
    });
};
