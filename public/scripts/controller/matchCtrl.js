
app.controller('matchCtrl', function ($scope,$http,$location,$rootScope) {
	console.log('Match control is under control :P ');

	var lol;
    $scope.matchSelection = true;
    $scope.teamSelection  = false;
    $scope.team = [];
    $scope.currentTeamMembers = [];



		$scope.getTeams = function(level) {
        //Returnes a set of teams

				var h=($rootScope.loggedInUser.hood);


				$http.get('/team/search/hood/'+h)
				.success(function(data) {
						$scope.teams = data.slice(0,	5);
						$scope.toggle();
						console.log('******',data);

				})
				.error(function(err) {
						console.log(err);
				});
				

      };






    $scope.toggle = function() {
        $scope.teamSelection = !$scope.teamSelection;
        $scope.matchSelection= !$scope.matchSelection;
    };

});
