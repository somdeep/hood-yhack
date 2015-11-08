app.controller('registerCtrl', function ($rootScope, $scope,$http,$location,  $routeParams) {
    $scope.registerData = {};
    $scope.registerData.nickname='';
    $scope.registerData.position='';
    $scope.registerData.jersey='';
    $scope.registerData.hood='';
    $scope.registerData.teamId='';
    
    $scope.saveData = function() {
        console.log($scope.registerData);
        var playerId = $rootScope.loggedInUser.playerId;
        if (playerId==="" || typeof(playerId)==="undefined")
            $location.path('/login');
        //inserting the first time registration data
        $http.put('/player/update/'+playerId, $scope.registerData)
        .success(function(data) {
            console.log('Updated');
            console.log(data);
            $location.path('/');
        })
        .error(function(err) {
            console.log(err);
        });
    };
});