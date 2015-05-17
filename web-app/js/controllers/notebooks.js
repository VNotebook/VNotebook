'use strict';

application.controller('NotebooksController', function($scope, $routeParams ,$location, Elements) {

  var load = function () {
    $scope.library = null;
    var id = $routeParams.libraryId;
    Elements.getLibraryById(id).then(function(response) {
      $scope.library = response.data.library;
    });
  };

  $scope.openNotebook = function (notebook) {
    var id = notebook.id;
    $location.path('/cuaderno/' + id);
  };

  load();
});
