application.controller('LoginDialogController', function($scope, authService,
  apiUrl, $http, $q, alertService) {
  $scope.credentials = {
    username: "",
    password: ""
  };

  $scope.user = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: ""
  };

  $scope.login = function() {
    var credentials = $scope.credentials;
    authService.login(credentials.username, credentials.password)
    .then(function() {
      $scope.$close();
    }, function(data) {
      if (data.status === 401) {
        alertService.error("Error", "Credenciales incorrectos");
      }
    });
  };

  $scope.register = function() {
    $http.post(apiUrl + "/users", $scope.user)
    .then(function() {
      return authService.login($scope.user.username, $scope.user.password);
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];
      return $q.reject(response);
    }).then(function() {
      $scope.$close();
    });
  };
});
