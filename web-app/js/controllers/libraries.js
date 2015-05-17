'use strict';

application.controller('LibrariesController', function($scope, $location, $modal,
  Elements) {
    var load = function () {
        $scope.libraries = [];
        Elements.getLibraries().then(function(response) {
          $scope.libraries = response.data;
        }, function() {
          alert("Error al obtener las bibliotecas");
        });
    };

    $scope.selectLibrary = function(library) {
        $location.path('/bibliotecas/' + library.id);
    };

    $scope.add = function() {
      $modal.open({
        templateUrl: 'templates/libraryEditorDialog.html',
        controller: 'LibraryEditorDialogController'
      }).result.then(load);
    };

    $scope.$on("auth.changed", load);

    load();
});
