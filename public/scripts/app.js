var app = angular.module('mainApp', ['ngRoute','ngCookies','facebookUtils','ngFileUpload'])
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
      controller:    'feedCtrl',
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



app.controller('homeCtrl', function ($scope, $http, $rootScope, $location, facebookUser, Upload ) {
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
            $rootScope.loggedInUser.team={'name':'RockOn','owner':false};
            
            //Sending to backend to verify profile or create profile if non existant
            $scope.updateUserDetails(JSON.parse(JSON.stringify(response)));
            
            //set cookie
            $scope.isLoggedIn = true;
            console.log(JSON.parse(JSON.stringify(response)));
            setCookie('fbVal',JSON.stringify(response),1,'');
            
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
        console.log(userData.name);
        $http.post('/player/validate', {"name":userData.name,"id":userData.id})
        .success(function(data) {
            console.log('==================');
            console.log(data);
            if (data.status=="new") {
                $location.path('/register');
            } else if(data.status == "error") {
                deleteCookie('fbVal');
                $scope.isLoggedIn = false;
                $rootScope.loggedInUser = undefined;
            } else {
                setCookie('fbVal',JSON.stringify(data),1,'');
                $rootScope.loggedInUser = data;
                $scope.isLoggedIn = true;
            }
        })
        .error(function(err) {
            console.log(err);
        });
    };
    //$('#myModal').modal("hide");
    $scope.addScore = function() {
        //$('#myModal').modal("toggle");
    };
    
    $scope.model = {};
    $scope.selectedFile = [];
    $scope.uploadProgress = 0;
    
    
    $scope.onFileSelect = function ($files) {
        $scope.uploadProgress = 0;
        $scope.selectedFile = $files;
    };
    
    $scope.uploadPhoto = function(file) {
        console.log(document.getElementById('file'));
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