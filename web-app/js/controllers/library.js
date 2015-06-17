'use strict';

application.controller('LibraryController', function($scope, $routeParams,
  $location, $modal, Elements, alertService, $http, apiUrl) {

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

  $scope.edit = function() {
    $modal.open({
      templateUrl: 'templates/libraryEditorDialog.html',
      controller: 'LibraryEditorDialogController',
      resolve: {
        toEdit: function() {
          return $scope.library;
        }
      }
    }).result.then(load);
  };

  $scope.delete = function() {
    var library = $scope.library;
    alertService.deleteConfirm(
      "Está a punto de eliminar la biblioteca \"" +
      library.name + "\". Perderá todo el contenido, incluyendo cuadernos y páginas.\n\n" +
      "Para confirmar que esto no es un error, escriba el nombre de la biblioteca a continuación:",
      library.name)
    .then(function() {
      return $http.delete(apiUrl + "/libraries/" + library.id);
    }).then(function() {
      $location.path("/");
    });
  };

  $scope.add = function() {
    $modal.open({
      templateUrl: 'templates/notebookEditorDialog.html',
      controller: 'NotebookEditorDialogController',
      resolve: {
        toEdit: function() { return null; },
        libraryId: function() { return libraryId; }
      }
    }).result.then(load);
  };

  load();
});
