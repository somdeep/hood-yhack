
//Initial configuration
var express  = require('express');
var app      = express(); 								// create our app w/ express

var port  	 = process.env.PORT || 8000; 				// set the port

app.use(express.static(__dirname + '/public')); 	// set the static files location

require('./app/routes/routes.js')(app);


//Start the awesomeness
app.listen(port);	
console.log('Magic happens on port '+port); 
