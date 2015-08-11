MyApp.controller('HomeController', ['$scope', '$rootScope', function($scope,$rootScope){

	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};


  	$scope.addStripeCardToUser = function(){
  		var payload = {
  			number: $scope.user.creditcard.number,
  			month: $scope.user.creditcard.month,
  			year: $scope.user.creditcard.year,
  			cvc: $scope.user.creditcard.cvc
  		};

  		Parse.Cloud.run('addStripeCardToUser', { payload: payload }, {
  		  success: function(cardID) {
  		  	console.log("card ID is: "+cardID);

          // save cardID in Parse.User //
  		  },
  		  error: function(error) {
  		  	console.log(error);
  		  }
  		});
  	};



    $scope.getStripeToken = function(){
      var tokenID = $scope.user.tokenID;
      Parse.Cloud.run('getStripeToken', { tokenID: tokenID }, {
        success: function(token) {
          console.log(token);
        },
        error: function(error) {
          console.log(error);
        }
      });
    };


    $scope.chargeStripeCardOfUser = function(){
      var customerID = "cus_6eu21pogeFxGh6";
      var amount = 600;

      Parse.Cloud.run('chargeStripeCardOfUser',
        { customerID: customerID,
          amount: amount
        },
        { success: function(response) {
          // console.log(response);
          var mssg = "Your "+response.source.brand+" was successfully charged $"+
                      (response.amount)/100 + " " + response.currency;
          $scope.alerts.push({type:"", mssg:mssg});

          // save in Parse.Tickets //
        },
        error: function(error) {
          console.log(error);
        }
      });
    };

}]);