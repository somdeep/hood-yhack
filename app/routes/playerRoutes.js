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
    	playerProfile.remove({_id:req.params.playerId},function (err,removed){
    		if(err)
    			res.send(err);
    		res.json(removed);
    	});
    });


		app.post('/player/validate',function(req,res){
			var flag=0;
            var player=req.body;
            console.log(player);
            playerProfile.find({name:player.name},function(err,data){

						if(err) res.send(err);

						//if new player
						if (data.length==0)
						{
											res.json({"status":"new"});
                            player['playerId'] = player.id
                            playerProfile.create(player,function(err,data1){

								    		if(err)
								        		res.send(err);

								        	res.json(data1);
							    		});
						}


						else
						{


											var tmp=data[0];
											var str= JSON.parse(JSON.stringify(tmp), function(k, v) {
											  //console.log(v); // log the current property name, the last is "".
												return v;       // return the unchanged property value.
											});
											var cnt=0;
                                            flag = 1;
                                            if (player.name === str.name && player.id === str.playerId)
                                                flag = 0
                                            /*
											for (key in player)
											{
												if(!(player[key]==str[key]))
												flag=1;
											}
                                            */
											if(flag==1)
											{
												var ret={"status":"error"};
												res.json(ret);
											}

											tmp["status"]="exists";
											res.json(tmp);


					}


			});
		});

};
