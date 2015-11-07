var mongoose = require('mongoose');

var teamProfile = require('./../models/teamProfile');


module.exports = function(app) {


//CRUD for team


// getTeam
    app.get('/getTeams', function(req,res) {
      teamProfile.find({},function(err,data){
        if(err) res.send(err);
        res.json(data);
      });
    });

// postTeam
    app.post('/createTeam', function(req, res) {
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
    app.put('/updateTeam/:teamId', function(req, res) {
        console.log(req.body);

        var updatedTeam = req.body;
        // Id should be genereated by DB as auto
        teamProfile.update({teamId:req.params.teamId}, {$set : updatedTeam}, function(err, data) {
            if(err) res.send(err);

            res.json(data);
        });
    });

// delTeam
    app.delete('/deleteTeam/:teamId', function(req, res) {
        console.log(req.body);

        teamProfile.remove({teamId:req.params.teamId}, function(err, removed){
            if(err) res.send(err);

            res.json(removed);
        });
    });
};
