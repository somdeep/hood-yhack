var mongoose = require('mongoose');

var playerProfile = require('./../models/playerProfile');

var playerSchema = {
name: 1,
player_id:1,
address: 1,
contact: 1
};

module.exports = function(app) {

	app.get('/player/get', function (req,res) {

        playerProfile.find(function (err,players){
        	if(err)
        		res.send(err);
        	res.json(players);
        });
    });



	app.get('/player/get/:playerId', function (req,res){

    	playerProfile.find({playerId:req.params.playerId}, function (err,data){
    		if(err)
    			res.send(err);
    		res.json(data);
    	});
    });


    app.post('/player/create', function(req,res){

    	var player = req.body;
    	//player.name=req.body.name;
    	console.log(player);
    	playerProfile.create(player,function(err,data){

    		if(err)
        		res.send(err);

        	res.json(data);


    	});


    });

    app.put('/player/update/:playerId', function (req,res){
    	console.log(req.body);

    	var updated=req.body;
    	console.log(updated);

    	playerProfile.update ({playerId:req.params.playerId},{$set : updated}, function (err,updated){
    		if (err) 
    			res.send(err);
    			
    			res.json(updated);
    		});
    	});

    

    
    app.delete('/player/delete/:playerId', function (req,res){
    	playerProfile.remove({playerId:req.params.playerId},function (err,removed){
    		if(err)
    			res.send(err);
    		res.json(removed);
    	});
    });
};