'use strict';

application.controller('NotebookController', function($scope, $location,
  $routeParams, Elements, appConfig) {
  var initialLeftPanel = [
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

  var initialRightPanel = [
    {
      title: "Editar",
      buttonClass: "glyphicon glyphicon-pencil",
      action: $scope.doNothing
    },
    {
      title: "Borrar",
      buttonClass: "glyphicon glyphicon-erase",
      action: $scope.doNothing
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
});
