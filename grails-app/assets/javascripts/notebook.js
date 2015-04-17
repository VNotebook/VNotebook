'use strict';

application.controller('NotebookController', function($scope, $location, $routeParams, Elements) {

    $scope.changePosition = function () {
        var temp = $scope.leftPanel;
        $scope.leftPanel = $scope.rightPanel;
        $scope.rightPanel = temp;
    };

    $scope.doNothing = function () {
        // do something here
    };

    $scope.leftPanel = [
        {
            title: "Widget 1",
            buttonClass: "glyphicon glyphicon-camera",
            action: $scope.doNothing
        },
        {
            title: "Widget 2",
            buttonClass: "glyphicon glyphicon-edit",
            action: $scope.doNothing
        }
    ];
    $scope.rightPanel = [
        {
            title: "Editar",
            buttonClass: "glyphicon glyphicon-pencil",
            action: $scope.doNothing
        },
        {
            title: "Borrar",
            buttonClass: "glyphicon glyphicon-erase",
            action: $scope.doNothing
        },
        {
            title: "Cambiar",
            buttonClass: "glyphicon glyphicon-transfer",
            action: $scope.changePosition
        }
    ];

    var load = function () {

        // Load something
    };

    load();
});
