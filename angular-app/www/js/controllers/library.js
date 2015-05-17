'use strict';

application.controller('LibraryController', function($scope, $routeParams,
  $location, $modal, Elements) {

  var libraryId = $routeParams.libraryId;

  var load = function () {
    $scope.library = null;

    Elements.getLibraryById(libraryId).then(function(response) {
      $scope.library = response.data;
    });
  };

  $scope.openNotebook = function (notebook) {
    var id = notebook.id;
    $location.path('/cuaderno/' + id);
  };

  $scope.add = function() {
    $modal.open({
      templateUrl: 'templates/notebookEditorDialog.html',
      controller: 'NotebookEditorDialogController',
      resolve: {
        libraryId: function() { return libraryId }
      }
    }).result.then(load);
  };

  load();
});
