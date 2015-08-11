
// initialize Parse
Parse.initialize("37aU6YcLZX9bBaZVfvTyJ1Hrn6BOqhMJP5dhXcsa", "RsYEDzO8WP005CGIvRpLble3UZx35LSBg7RedA6R");

// initialize Stripe
Stripe.setPublishableKey('pk_test_z1fC8cyGGznY4eJBk5msj6WO');

// define
var MyApp = angular.module('MyApp', ['ngRoute', 'ngMessages', 'parse-angular']);

// main
MyApp.run(['$rootScope', function($scope) {

  $scope.currentUser = Parse.User.current();
  $scope.user = {
  	name: Parse.User.current()==null ? "Guest" : Parse.User.current().getUsername(),
  	username: null,
  	password: null,
    creditcard: null
  };
  $scope.alerts = [];

  $scope.isAuthenticated = function() {
    if ($scope.currentUser === null)
        return false;
    return true;
  };

}]);


// routes
MyApp.config(function($routeProvider) {
    $routeProvider
	    .when('/', {
	      controller: 'HomeController',
	      templateUrl: 'app/views/home.html'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });

});


// directive
MyApp.directive('dismissOnTimeout', ['$timeout', function($timeout) {
  return {
    // require: 'alert',
    link: function(scope, element, attrs) {
      $timeout(function(){
        scope.closeAlert();
      }, parseInt(attrs.dismissOnTimeout, 10));
    }
  }
}]);

