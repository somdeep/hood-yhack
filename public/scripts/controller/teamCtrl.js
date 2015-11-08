
app.controller('teamCtrl', function ($rootScope, $scope,$http,$location,  $routeParams) {
	$scope.teamExists = true;
    $scope.init = function() {
        if ($rootScope.loggedInUser === "undefined" || readCookie('fbVal') != "" ) {
            var user = JSON.parse(readCookie('fbVal'));
        }
        console.log('-----------------------');
        console.log($rootScope.loggedInUser);
        $scope.challangeVisibility = $rootScope.team===$rootScope.loggedInUser.team;
    };
    console.log($routeParams.teamId);
    $http.get('/team/get/id/'+$routeParams.teamId)
    .success(function(data) {
        if (data.length == 0) {
            $scope.teamExists = false;
        } else {
            $scope.currentTeam = data[0];
            $scope.getTeamMembers();
        
        }
    })
    .error(function(err) {
    });
    
    $scope.getTeamMembers = function() {
        var temp = $scope.currentTeam.teamMembers;
        console.log(temp);
        $http.get('/player/getMany/'+temp.join('+'))
        .success(function(data) {
            
            $scope.currentTeamMembers = data;
        })
        .error(function(err) {
            console.log(err);
        });
    };
    
    $scope.addNewTeamMember = function(position) {
        $scope.memSearch = "";
        var data = $scope.searchResults[position];
        $scope.currentTeamMembers.push(data)
        
        var newData = $scope.currentTeam.teamMembers;
        newData.push(data.playerId);
        $http.put('/team/update/'+ $scope.currentTeam.teamId, {teamMembers : newData})
        .success(function(data) {
            console.log('Member Added');
            //Change the team of the player too
        })
        .error(function(err) {
            console.log(err);
        });
        $http.put('/player/update/'+data.playerId,{teamId:$scope.currentTeam.teamId})
        .success(function(data) {
            console.log('Team name  Added in player');
            //Change the team of the player too
        })
        .error(function(err) {
            console.log(err);
        });
    };
    
    $scope.removeMember = function(player) {
        console.log(player);
        var pos = $scope.currentTeamMembers.indexOf(player);
        console.log(pos);
        $scope.currentTeamMembers.splice(pos,1);
        
        var lst = $scope.currentTeam.teamMembers;
        pos = lst.indexOf(player.playerId);
        lst.splice(pos,1);
        $http.put('/team/update/'+ $scope.currentTeam.teamId, {teamMembers : lst})
        .success(function(data) {
            console.log('Member removed');
            //Change the team of the player too
        })
        .error(function(err) {
            console.log(err);
        });
        $http.put('/player/update/'+player.playerId,{teamId:""})
        .success(function(data) {
            console.log('Team name  removed in player');
            //Change the team of the player too
        })
        .error(function(err) {
            console.log(err);
        });
        
    };
    
    $scope.createTeam = function() {
        $http.post('/team/create',{name:$scope.newTeamName, hood:$scope.hood,warcry:$scope.warcry,stats:{won: 0,lost: 0},teamMembers:[$rootScope.loggedInUser.playerId]})
        .success(function(data) {
            $location.path('/team/'+data.teamId);
        })
        .error(function(err) {
            console.log(err);
        });
    };
    
    $scope.getMembers = function() {
        var searchString = $scope.memSearch;
        $http.get('/player/search/name/'+searchString)
        .success(function(data) {
            $scope.searchResults = data;
        })
        .error(function(err) {
            console.log(err);
        });
    };
    //$scope.init();
    
});
