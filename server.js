
//Initial configuration
var express  = require('express');
var app      = express(); 								// create our app w/ express

var bodyParser     = require('body-parser');			// To fetch data during posts
var port  	 = process.env.PORT || 8000; 				// set the port
// auth related

var database = require('./app/config/database');
var session      = require('express-session');

//Middle-tier configuration

app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json

app.use(express.static(__dirname + '/public')); 	// set the static files location

require('./app/routes/routes.js')(app);


//Start the awesomeness
app.listen(port);	
console.log('Magic happens on port '+port); 
