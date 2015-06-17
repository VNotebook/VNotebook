application.controller('LibraryEditorDialogController',
function($scope, $http, apiUrl, toEdit, alertService) {
  $scope.isEditing = toEdit != null;

  if ($scope.isEditing) {
    $scope.data = angular.copy(toEdit);
  } else {
    $scope.data = {
      name: ""
    };
  }

  $scope.errors = null;

  $scope.save = function() {
    $scope.errors = null;

    var promise = $scope.isEditing ?
      $http.put(apiUrl + "/libraries/" + $scope.data.id, $scope.data) :
      $http.post(apiUrl + "/libraries", $scope.data);

    promise.then(function() {
      $scope.$close();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];

      if (!$scope.errors) {
        alertService.error("Error al guardar", "Ocurrió un error desconocido al guardar la biblioteca");
      }
    });
  };
});
