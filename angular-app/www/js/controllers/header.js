application.controller('HeaderController', function($scope, $location, $modal) {
  $scope.isActive = function(location) {
    return location.indexOf($location.path()) === 0;
  };

  $scope.openConfiguration = function() {
    $modal.open({
      templateUrl: 'templates/configurationDialog.html',
      controller: 'ConfigurationDialogController'
    });
  };
});
