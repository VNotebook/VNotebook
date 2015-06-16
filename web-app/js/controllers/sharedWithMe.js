'use strict';

application.controller('SharedWithMeController', function($scope, $location,
  alertService, $http, apiUrl) {

  var load = function () {
    $scope.notebooks = null;

    $http.get(apiUrl + "/sharedNotebooks").then(function(response) {
      $scope.notebooks = response.data;
    });
  };

  $scope.openNotebook = function (notebook) {
    var id = notebook.id;
    $location.path('/cuaderno/' + id);
  };

  load();
});
