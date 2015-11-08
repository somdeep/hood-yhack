
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
        }
    })
    .error(function(err) {
    });
    
    
});
