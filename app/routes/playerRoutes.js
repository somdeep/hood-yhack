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



	app.get('/player/get/:player_id', function (req,res){

    	playerProfile.find({player_id:req.params.player_id}, function (err,data){
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

    app.put('/player/update/:player_id', function (req,res){
    	console.log(req.body);

    	var updated=req.body;
    	console.log(updated);

    	playerProfile.update ({player_id:req.params.player_id},{$set : updated}, function (err,updated){
    		if (err) 
    			res.send(err);
    			
    			res.json(updated);
    		});
    	});

    

    
    app.delete('/player/delete/:player_id', function (req,res){
    	playerProfile.remove({player_id:req.params.player_id},function (err,removed){
    		if(err)
    			res.send(err);
    		res.json(removed);
    	});
    });
};