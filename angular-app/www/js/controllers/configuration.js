application.controller('ConfigurationController', function($scope,
  appConfig) {
    var config = $scope.config = {
      userIsLeftHanded: appConfig.getUserIsLeftHanded()
    };

    $scope.save = function() {
      appConfig.setUserIsLeftHanded(config.userIsLeftHanded);
      $scope.$close();
    };
});
