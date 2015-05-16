application.controller('LoginDialogController', function($scope, authService) {
  $scope.credentials = {
    username: "",
    password: ""
  };

  $scope.login = function() {
    var credentials = $scope.credentials;
    authService.login(credentials.username, credentials.password)
    .then(function() {
      $scope.$close();
    }, function(data) {
      console.log("error while signing in");
      if (data.status === 401) {
        alert("Credenciales incorrectos");
      }
    });
  };
});
