var mongoose = require('mongoose');

var teamStats = require('./../models/teamStats');


module.exports = function(app) {

// getTeams
    app.get('/teamStats/get', function(req,res) {
      teamStats.find({},function(err,data){
        if(err) res.send(err);
        res.json(data);
      });
    });

// getTeamById
    app.get('/teamStats/get/id/:teamId', function(req, res) {
        teamStats.find({teamId:req.params.teamId}, function(err, data) {
            if(err) res.send(err);
            res.json(data);
        });
    });

// getTeamByName
    app.get('/teamStats/get/name/:teamName', function(req, res) {
        teamStats.find({teamName:req.params.teamName}, function(err, data) {
            if(err) res.send(err);
            res.json(data);
        });
    });

// postTeam
    app.post('/teamStats/create', function(req, res) {
        console.log(req.body);

        // schema validation pending
        var newTeam = req.body;
        console.log(newTeam['teamId']);

        teamStats.create(newTeam, function(err, data) {
            console.log("data", data);
            if(err) res.send(err);
            res.json(data);
        });
    });

// updateTeam
    app.put('/teamStats/update/:teamId', function(req, res) {
        console.log(req.body);

        var updatedTeam = req.body;
        // Id should be genereated by DB as auto
        teamStats.update({teamId:req.params.teamId}, {$set : updatedTeam}, function(err, data) {
            if(err) res.send(err);

            res.json(data);
        });
    });

// delTeam
    app.delete('/teamStats/delete/:teamId', function(req, res) {
        console.log(req.body);

        teamStats.remove({teamId:req.params.teamId}, function(err, removed){
            if(err) res.send(err);

            res.json(removed);
        });
    });
};
