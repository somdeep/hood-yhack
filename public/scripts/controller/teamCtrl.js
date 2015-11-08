
app.controller('teamCtrl', function ($rootScope, $scope,$http,$location,  $routeParams) {
	
    $scope.init = function() {
        if ($rootScope.loggedInUser === "undefined" || readCookie('fbVal') != "" ) {
            var user = JSON.parse(readCookie('fbVal'));
        }
    };
    console.log($routeParams.teamId);
    $http.get('/team/get/id/'+$routeParams.teamId)
    .success(function(data) {
        //console.log('#########',data);
        if (data.length == 0) {
            //$location.path('/');
        } else {
            $scope.currentTeam = data[0];
            $scope.getTeamMembers();
        
        }
    })
    .error(function(err) {
    });
    
    $scope.getTeamMembers = function() {
        console.log('00000000000');
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
    
    
});
