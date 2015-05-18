'use strict';

application.controller('NotebooksController', function($scope, $routeParams ,$location, Elements) {

    var load = function () {
        var id = $routeParams.libraryId;
        var library = Elements.getLibraryById(id);

        if (library) {
            $scope.notebooks = library.notebooks.map(function (currentValue) {
                return Elements.getNotebookById(currentValue);
            });
        }
    };

    $scope.openNotebook = function(index) {
        var id = $scope.notebooks[index].id;
        $location.path('/cuaderno/' + id);
    };

    load();
});
