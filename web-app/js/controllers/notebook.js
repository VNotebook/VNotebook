'use strict';

application.controller('NotebookController', function($scope, $location,
  $routeParams, Elements, appConfig) {

    $scope.mode = "Draw"; //Default setting
    $scope.svg = "";
    $scope.color = "#000000";
    $scope.fonttypes = ["Arial", "Comic Sans MS", "Helvetica"];
    $scope.format = {
        'font-family': 'Arial',
        'color': '#000000'
    };
    document.execCommand('styleWithCSS', true, null);

    $scope.$watch('svg', function() {
      // TODO: save the svg
    });

    var initialLeftPanel = [
      {
        title: "Cámara",
        buttonClass: "glyphicon glyphicon-camera",
        action: "Nothing"
      },
      {
        title: "Widget 2",
        buttonClass: "glyphicon glyphicon-edit",
        action: "Nothing"
      }
    ];

    var initialRightPanel = [
      {
        title: "Dibujar",
        buttonClass: "glyphicon glyphicon-pencil",
        action: "Draw"
      },
      {
        title: "Borrar",
        buttonClass: "glyphicon glyphicon-erase",
        action: "Erase"
      },
        {
            title: "Texto",
            buttonClass: "glyphicon glyphicon-font",
            action: "Text"
        }

    ];

    $scope.leftPanel = initialLeftPanel;
    $scope.rightPanel = initialRightPanel;

    $scope.$watch(function() {
      return appConfig.getUserIsLeftHanded();
    }, function(newValue) {
      if (newValue) {
        $scope.leftPanel = initialRightPanel;
        $scope.rightPanel = initialLeftPanel;
      } else {
        $scope.leftPanel = initialLeftPanel;
        $scope.rightPanel = initialRightPanel;
      }
    });

    $scope.defineCurrentObject = function(currentObject) {
        $scope.mode = currentObject;
    };

    $scope.actionOverText = function(action) {
        document.execCommand(action, false, null);
    };

    $scope.changeFont = function(type) {
        $scope.format['font-family'] = type;
    };

    $scope.$watch("format['font-family']", function() {
        document.execCommand("fontName", false, "Comic Sans MS");
    }, true);

    $scope.$watch('format.color', function() {
        document.execCommand("foreColor", false, $scope.format['color'])
    }, true);
});