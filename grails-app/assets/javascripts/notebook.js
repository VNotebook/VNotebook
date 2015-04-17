'use strict';

application.controller('NotebookController', function($scope, $location, $routeParams, Elements) {
    $scope.leftPanel = [];
    $scope.rightPanel = [];

    var load = function () {
        var notebookId = parseInt($routeParams.notebookId.replace(':', ''));

        // Load something

        var index;
        for(index in Elements.widgetsPanel) {
            $scope.leftPanel.push(Elements.widgetsPanel[index]);
        }

        for(index in Elements.toolsPanel) {
            $scope.rightPanel.push(Elements.toolsPanel[index]);
        }
    };

    $scope.changePosition = function () {
        var temp = $scope.leftPanel;
        $scope.leftPanel = $scope.rightPanel;
        $scope.rightPanel = $scope.leftPanel;
    };

    load();
});
