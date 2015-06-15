application.controller('NotebookEditorDialogController',
function($scope, $http, apiUrl, libraryId) {
  $scope.data = {
    name: "",
    libraryId: libraryId
  };
  $scope.errors = null;

  $scope.save = function() {
    $scope.errors = null;
    $http.post(apiUrl + "/notebooks", $scope.data)
    .then(function() {
      $scope.$close();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];
    });
  };
});
