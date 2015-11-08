
var mongoose = require('mongoose');

var playerProfile = require('./../models/playerProfile');
var teamProfile = require('./../models/teamProfile');

//Multer - file upload
var multer  = require('multer')
var upload = multer({dest:'tmp/'});

fs = require('fs')

module.exports = function(app) {
	//Add the API for player Operations
    require('./playerRoutes')(app);
	//Add the API for team Operations
    require('./teamRoutes')(app);
    require('./playerStatsRoutes')(app);
    require('./teamStatsRoutes')(app);
    require('./matchRoutes')(app);
    
    //Uploading photos
    
    app.post('/change', upload.single('file'), function(req,res) {
        console.log(req.body);
        console.log("---------FILES-------------");
        console.log(req.file);
        fs.readFile(req.file.path, function (err, data) {
          // ...
          if (err) res.send(err);
          console.log('reading the file');
          var newPath = "public/files/new";
          fs.writeFile(newPath, data, function (err) {
              console.log('Written the file');
          });
          res.json({path:req.file.fileName});
        });
        //res.send(200);
        //res.end();

    });
    
    
	//Send the home page - for all other requests
    app.get('/*', function(req,res) {
        res.sendfile('public/html/home.html');
    });
	


};
