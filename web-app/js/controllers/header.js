application.controller('HeaderController', function($scope, $location, $modal,
  loginRequestHandler, authService) {
  $scope.isActive = function(location) {
    return location.indexOf($location.path()) === 0;
  };

  $scope.openConfiguration = function() {
    $modal.open({
      templateUrl: 'templates/configuration.html',
      controller: 'ConfigurationController'
    });
  };

  $scope.login = function() {
    loginRequestHandler.requestLogin();
  };

  $scope.logout = function() {
    authService.logout();
  };

  $scope.isLoggedIn = function() {
    return authService.isLoggedIn();
  };
  $scope.getUser = function() {
    return authService.user;
  };
});
