var app = angular.module('mainApp', ['ngRoute','ngCookies','ui.router','facebookUtils'])
.constant('facebookConfigSettings', {
    'routingEnabled' : true,
    'channelFile'    : 'channel.html',
    'appID'          : '927018427365481',
    'loginPath'      : '/login'
  });
    
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/login', {
      templateUrl: '/html/login.html',
      controller: 'loginCtrl',
      needAuth: false
    })
    .when('/', {
      templateUrl: '/html/feed.html',
      controller: 'feedCtrl',
      needAuth: true
    })
    .when('/profile', {
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      needAuth: true
    })
    .when('/team', {
      templateUrl: '/html/team.html',
      controller: 'teamCtrl',
      needAuth: true
    })
    .when('/match', {
      templateUrl: '/html/match.html',
      controller: 'matchCtrl',
      needAuth: true
    })
    .otherwise({
      redirectTo  : '/'
    });
    
    // use the HTML5 History API
	$locationProvider.html5Mode(true);
});

app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);


app.controller('homeCtrl', function ($scope, $http, $rootScope, $location, facebookUser) {
    $rootScope.loggedInUser = undefined;
    console.log('home control');
    
    $scope.isLoggedIn = false;
    
    //If not login and not logged in
    if($location.$$path != '/login' && readCookie('fbVal')==="") {
        console.log('Not logged in');
        $location.path('/login');
    }
    //If login and not loggedin
    if($location.$$path == '/login' && readCookie('fbVal')!="") {
        $location.path('/');
        $scope.isLoggedIn = true;
    
    }
    
    
    $rootScope.$on('fbLoginSuccess', function(name, response) {
      facebookUser.then(function(user) {
        //Values only if made public will be retured by FB
        user.api('/me?fields=id,name,email,birthday,cover').then(function(response) {
            $rootScope.loggedInUser = response;
            console.log(response);
            //Sending to backend to verify profile or create profile if non existant
            $scope.updateUserDetails(response);
            
            //set cookie
            $scope.isLoggedIn = true;
            console.log(JSON.parse(JSON.stringify(response)));
            setCookie('fbVal',JSON.stringify(response),1,'');
            console.log('------Successful',response);
            if($location.$$path === '/login') {
                $location.path('/');
            }
            
        });
      });
    });

    $rootScope.$on('fbLogoutSuccess', function() {
      $scope.$apply(function() {
        $rootScope.loggedInUser = undefined;
          deleteCookie('fbVal');
      });
    });
    
    $scope.logout = function() {
        deleteCookie('fbVal');
        $scope.isLoggedIn = false;
    };
    
    $scope.updateUserDetails = function(userData) {
        $http.post('/player/verify',userData)
        .success(function(data) {
            deleteCookie('fbVal');
            setCookie('fbVal',JSON.stringify(data),1,'');
            $rootScope.loggedInUser = data;
        })
        .error(function(err) {
            console.log(err);
        });
    };
});

function setCookie( name, value, days, path ) {
    var date = new Date();
    date.setTime( date.getTime() + ( days*24*60*60*1000 ) );
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + '=' + value + expires + '; path=' + path;
}

function readCookie(cookieName) {
    var theCookie=""+document.cookie;
    var ind=theCookie.indexOf(cookieName);
    if (ind==-1 || cookieName=="") return "";
    var ind1=theCookie.indexOf(';',ind);
    if (ind1==-1) ind1=theCookie.length;
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

function deleteCookie( cookieName ) {
    if( readCookie( cookieName ) ) {
        setCookie( cookieName, '', 0, '/' );
    }
}