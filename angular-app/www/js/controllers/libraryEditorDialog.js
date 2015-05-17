application.controller('LibraryEditorDialogController',
function($scope, $http, apiUrl) {
  $scope.data = {
    name: ""
  };
  $scope.errors = null;

  $scope.save = function() {
    $scope.errors = null;
    $http.post(apiUrl + "/libraries", $scope.data).then(function() {
      $scope.$close();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];
    });
  };
});
