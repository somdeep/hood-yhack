
app.controller('profileCtrl', function ($scope,$http,$location, $routeParams) {
	console.log($routeParams);
    $http.get('/player/get/' + $routeParams.pId)
    .success(function(data) {
        $scope.currentUser = data[0];
        console.log('******',data);
    })
    .error(function(err) {
        console.log(err);
    });

		$http.get('/playerStats/get/' + $routeParams.pId)
    .success(function(data) {
        $scope.currentUserStats = data[0];
        console.log('******',data);
    })
    .error(function(err) {
        console.log(err);
    });
});
