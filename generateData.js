// Let's try to populate some players

var mongoose = require('mongoose');
var database = require('./app/config/database'); 			// load the database config

var db = mongoose.connect(database.url);	// connect to mongoDB database on modulus.io
var faker = require("./node_modules/faker/index.js");

faker.locale = "en";

var stealsArray = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5];

var positions = ["Point Guard", "Shooting Guard", "Small forward", "Power Forward", "Center"];

var hoods = ["Upper Manhattan", "Marble Hill", "Inwood", "Fort George", "Washington Heights", "Hudson Heights (part of Washington Heights)", "West Harlem", "Hamilton Heights", "Manhattanville", "Morningside Heights", "South of Harlem", "Central Harlem", "Harlem", "Strivers' Row (Central Harlem)", "Astor Row (Central Harlem)", "Sugar Hill (Central Harlem)", "Marcus Garvey Park", "Mount Morris Historical District", "Le Petit Senegal (Little Senegal)", "East Harlem (Spanish Harlem)", "Upper East Side", "Silk Stocking District", "Lenox Hill", "Carnegie Hill", "Yorkville", "Upper West Side", "Manhattan Valley", "Bloomingdale District", "Lincoln Square (once San Juan Hill)", "Midtown neighborhoods", "Name of the neighborhood", "Midtown", "Columbus Circle", "Sutton Place", "Rockefeller Center", "Diamond District", "Theater District", "Turtle Bay", "Midtown East", "Midtown", "Tudor City", "Little Brazil", "Times Square", "Hudson Yards", "Midtown West", "Hell's Kitchen", "Clinton", "Garment District", "Herald Square", "Koreatown", "Murray Hill", "Tenderloin", "Madison Square", "Neighborhoods between Midtown and Downtown", "Name of the neighborhood", "Flower District", "Brookdale", "Hudson Yards", "Kips Bay", "Rose Hill", "NoMad", "Peter Cooper Village† (former Gas House district)", "Chelsea", "Flatiron District", "Toy District", "Photo District", "Gramercy Park", "Stuyvesant Square", "Union Square", "Stuyvesant Town† (former Gas House district)", "Meatpacking District", "Waterside Plaza", "†Large scale developments", "Downtown neighborhoods", "Name of the neighborhood", "Downtown Manhattan", "Little Germany (historic)", "Alphabet City and Loisaida", "East Village", "Greenwich Village", "NoHo", "Bowery", "West Village", "Lower East Side", "SoHo", "Nolita (NoLIta)", "Little Italy", "Chinatown", "Financial District", "Five Points (historic)", "Cooperative Village†", "Two Bridges", "Tribeca (TriBeCa)", "Civic Center", "Radio Row (historic)", "South Street Seaport Historical District", "Battery Park City"]

for(i = 0; i < 100; i++)
{
    var  name = faker.name.findName();
    var teamId = faker.random.number(i % 10 + 1);
    var position = positions[faker.random.number() % 5];
    var hood = hoods[faker.random.number() % 10];
    var temp1 = faker.random.number() % 2500;
    var temp2 = Math.floor(Math.sqrt(temp1));
    points = Math.abs(40 - temp2);
    temp1 = faker.random.number() % 900;
    temp2 = Math.floor(Math.sqrt(temp1));
    rebounds = Math.abs(25-temp2);
    temp1 = faker.random.number() % 400;
    temp2 = Math.floor(Math.sqrt(temp1));
    assists = Math.abs(20-temp2);
    steals = stealsArray[faker.random.number() % 15];
    var playerProfile = require('./app/models/playerProfile');
    var player ={
        name: name,
        teamId: teamId,
        position: position,
        hood: hood,
        stats:
        {
            points: points,
            rebounds: rebounds,
            assists: assists,
            steals: steals
        }
    }

    playerProfile.create(player, function(err, data){
        console.log("inserted");
    });
}

