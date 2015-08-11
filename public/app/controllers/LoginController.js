MyApp.controller('LoginController', ['$scope', '$rootScope', function($scope,$rootScope){

	// helper functions
  	function loginSuccess(user) {
	    $rootScope.$apply(function() {
	      $rootScope.currentUser = Parse.User.current();
        $rootScope.user.name = Parse.User.current().getUsername();
	    });
  	}

  	function loginFailure(user, error) {
   		$rootScope.alerts.push({ type:'warning', msg: "Error: " + error.message });
  	}


    // login
    $scope.logIn = function() {
		  var username = $scope.user.username;
	    var password = $scope.user.password;

	    Parse.User.logIn(username, password, {
	      success: loginSuccess,
	      error: loginFailure
	    });
    };

    // logout
  	$scope.logOut = function() {
	    Parse.User.logOut();
	    $rootScope.currentUser = null;
      $rootScope.user.name = "Guest";
  	};


  }]);