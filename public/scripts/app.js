var app = angular.module('mainApp', ['ngRoute']);
  

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
	.when('/', {
        templateUrl	:	'html/feed.html',
        controller	:	'feedCtrl'
	})
    .when('/login', {
        templateUrl	:	'html/login.html',
        controller	:	'loginCtrl'
	})
    .otherwise({ redirectTo: '/' });
	// use the HTML5 History API
	$locationProvider.html5Mode(true);
});


app.controller('homeCtrl', function ($scope,$http,$location) {
	console.log('Home control is under control :P ');
});