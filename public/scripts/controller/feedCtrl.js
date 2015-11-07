
app.controller('feedCtrl', function ($scope,$http,$location) {
	console.log('Feed control is under control :P ');
    
    $scope.feeds = [{wt:'Team A', lt:'Team B', score:'95-91',diff:4, comment:'Match that keeps you to the edge of your seats.'}]
});