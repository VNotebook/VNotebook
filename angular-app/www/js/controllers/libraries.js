'use strict';

application.controller('LibrariesController', function($scope, $location, Elements) {
    var load = function () {
        $scope.libraries = [];
        for(var library in Elements.libraries) {
            $scope.libraries.push(Elements.libraries[library]);
        }
    };

    $scope.selectLibrary = function(index) {
        var id = $scope.libraries[index].id;
        $location.path('/cuadernos/' + id);
    };

    load();
});