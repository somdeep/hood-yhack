
app.controller('matchCtrl', function ($scope,$http,$location) {
	console.log('Match control is under control :P ');
    
    $scope.matchSelection = true;
    $scope.teamSelection  = false;
    $scope.teams = [];
    $scope.getTeams = function(level) {
        //Returnes a set of teams
        data = {
    "_id" : "563eb000a257955407d0262d",
    "name" : "Rock On",
    "warcry" : "Fear not",
    "captain" : {
            "name" : "Reid Goodwin",
            "playerId" : 101
        },
    "teamMembers" : [ 
        {
            "name" : "Reid Goodwin",
            "playerId" : 101
        }, 
        {
            "name" : "Stanford Hyatt",
            "playerId" : 102
        }, 
        {
            "name" : "Telly Cronin",
            "playerId" : 103
        }, 
        {
            "name" : "Darby Bahringer",
            "playerId" : 104
        }, 
        {
            "name" : "Chester Wyman",
            "playerId" : 105
        }
    ],
    "hood" : "Morning Side, NY",
    "stats" : {
        "wins" : 121,
        "losses" : 32,
        "averageVictoryMargin" : 28,
        "homeWins" : 58
    }
};
        $scope.teams = [data];
        console.log($scope.teams);
        $scope.toggle();
    };
    
    $scope.toggle = function() {
        $scope.teamSelection = !$scope.teamSelection;
        $scope.matchSelection= !$scope.matchSelection;
    };
    
});

    