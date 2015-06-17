application.controller('SharesEditorDialogController',
function($scope, $http, apiUrl, notebookId, alertService) {
  $scope.errors = null;

  function reloadShares() {
    $scope.shares = null;

    $http.get(apiUrl + "/notebooks/" + notebookId + "/shares")
    .then(function(response) {
      $scope.shares = response.data;
    });
  };

  function resetForm() {
    $scope.data = {
      username: ''
    };
  }

  $scope.add = function() {
    $scope.errors = null;

    $http.post(apiUrl + "/notebooks/" + notebookId + "/shares", $scope.data)
    .then(function() {
      reloadShares();
      resetForm();
    }, function(response) {
      $scope.errors = response.data && response.data['errors'];

      if (!$scope.errors) {
        alertService.error("Error al compartir", "Ocurrió un error desconocido al compartir " +
          "el cuaderno con el usuario especificado");
      }
    });
  };

  $scope.delete = function(share) {
    $http.delete(apiUrl + "/notebooks/" + notebookId + "/shares/" +
      share.id, $scope.data)
    .then(reloadShares, function(response) {
      alertService.error("Error al eliminar", "Ocurrió un error desconocido al dejar de compartir " +
        "el cuaderno con el usuario especificado");
    });
  };

  reloadShares();
  resetForm();
});
