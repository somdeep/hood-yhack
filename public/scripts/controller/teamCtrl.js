
app.controller('teamCtrl', function ($rootScope, $scope,$http,$location) {
	console.log('Team control is under control :P ');
    
    
    
    $scope.init = function() {
        if ($rootScope.loggedInUser === "undefined" || readCookie('fbVal') != "" ) {
            var user = JSON.parse(readCookie('fbVal'));
            
        }
    };
    console.log($rootScope.loggedInUser)
});
