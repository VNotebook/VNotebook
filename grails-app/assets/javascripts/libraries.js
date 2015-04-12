'use strict';

application.controller('LibrariesController', function($scope, $location) {
    var load = function () {
        $scope.libraries = [
            {
                id: 0,
                title: "prueba 1"
            },
            {
                id: 1,
                title: "prueba 2"
            }
        ]
    };

    load();
});