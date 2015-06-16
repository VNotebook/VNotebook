application.controller('NotebookEditorDialogController',
function($scope, $http, apiUrl, libraryId, toEdit, alertService) {
  $scope.errors = null;

  $scope.isEditing = toEdit != null;
  if ($scope.isEditing) {
    $scope.data = angular.copy(toEdit);
  } else {
    $scope.data = {
      name: "",
      libraryId: libraryId
    };
  }

  $scope.save = function() {
    $scope.errors = null;

    var promise = $scope.isEditing ?
      $http.put(apiUrl + "/notebooks/" + $scope.data.id, $scope.data) :
      $http.post(apiUrl + "/notebooks", $scope.data);

    promise.then(function() {
      $scope.$close();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];
      if (!$scope.errors) {
        alertService.error("Error al guardar", "Ocurrió un error desconocido al guardar el cuaderno");
      }
    });
  };
});
