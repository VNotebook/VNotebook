application.controller('NotebookEditorDialogController',
function($scope, $http, apiUrl, libraryId) {
  $scope.data = {
    name: ""
  };
  $scope.errors = null;

  $scope.save = function() {
    $scope.errors = null;
    $http.post(apiUrl + "/libraries/" + libraryId + "/notebooks", $scope.data)
    .then(function() {
      $scope.$close();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];
    });
  };
});
