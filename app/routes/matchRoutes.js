var mongoose = require('mongoose');

var matches = require('./../models/matches');

module.exports = function(app) {

	app.get('/match/get', function (req,res) {

        matches.find(function (err,matches){
        	if(err)
        		res.send(err);
        	res.json(matches);
        });
    });

	app.get('/match/get/:matchId', function (req,res){

    	matches.find({matchId:req.params.matchId}, function (err,data){
    		if(err)
    			res.send(err);
    		res.json(data);
    	});
    });


    app.post('/match/create', function(req,res){

    	var match = req.body;
    	//match.name=req.body.name;
    	console.log(match);
    	matches.create(match,function(err,data){

    		if(err)
        		res.send(err);

        	res.json(data);
    	});
    });

    app.put('/match/update/:matchId', function (req,res){
    	console.log(req.body);

    	var updated=req.body;
    	console.log(updated);

    	matches.update ({matchId:req.params.matchId},{$set : updated}, function (err,updated){
    		if (err) 
    			res.send(err);
    			
    			res.json(updated);
    		});
    	});
    
    app.delete('/match/delete/:matchId', function (req,res){
    	matches.remove({matchId:req.params.matchId},function (err,removed){
    		if(err)
    			res.send(err);
    		res.json(removed);
    	});
    });
};
