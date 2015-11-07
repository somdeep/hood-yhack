var mongoose = require('mongoose');

var playerStats = require('./../models/playerStats');


module.exports = function(app) {

app.get('/playerStat/get', function (req,res) {

        playerStats.find(function (err,players){
        	if(err)
        		res.send(err);
        	res.json(players);
        });
    });


	app.get('/playerStat/get/:player_id', function (req,res){

    	playerStats.find({player_id:req.params.player_id}, function (err,data){
    		if(err)
    			res.send(err);
    		res.json(data);
    	});
    });


    app.post('/playerStat/create', function(req,res){

    	var player = req.body;
    	//player.name=req.body.name;
    	console.log(player);
    	playerStats.create(player,function(err,data){

    		if(err)
        		res.send(err);

        	res.json(data);


    	});


    });

    app.put('/playerStat/update/:player_id', function (req,res){
    	console.log(req.body);

    	var updated=req.body;
    	console.log(updated);

    	playerStats.update ({player_id:req.params.player_id},{$set : updated}, function (err,updated){
    		if (err) 
    			res.send(err);
    			
    			res.json(updated);
    		});
    	});

    

    
    app.delete('/playerStat/delete/:player_id', function (req,res){
    	playerStats.remove({player_id:req.params.player_id},function (err,removed){
    		if(err)
    			res.send(err);
    		res.json(removed);
    	});
    });
};