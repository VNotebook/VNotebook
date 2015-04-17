'use strict';

application.controller('NotebooksController', function($scope, $routeParams ,$location, Elements) {

    var load = function () {
        var libraryId = parseInt($routeParams.libraryId.replace(':', ''));
        $scope.notebooks = [];

        for(var id in Elements.libraries[libraryId].notebooks) {
            var index = Elements.libraries[libraryId].notebooks[id];
            $scope.notebooks.push(Elements.notebooks[index]);
        }
    };

    $scope.openNotebook = function (index) {
        var id = $scope.notebooks[index].id;
        $location.path('/cuaderno/:' + id);
    };

    load();
});
