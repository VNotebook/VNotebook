'use strict';

application.controller('NotebookController', function($scope, $location, $routeParams, Elements, appConfig, $modal,
                                                      alertService, $http, apiUrl) {
    var notebookId = $routeParams.notebookId;

    var load = function () {
      $scope.notebook = null;

      Elements.getNotebookById(notebookId).then(function(response) {
        $scope.notebook = response.data;
      });
    };

    var reloadShares = function() {
      $scope.shares = null;

      $http.get(apiUrl + "/notebooks/" + notebookId + "/shares")
          .then(function(response) {
            $scope.shares = response.data;
          });
    };

    $scope.edit = function() {
      $modal.open({
        templateUrl: 'templates/notebookEditorDialog.html',
        controller: 'NotebookEditorDialogController',
        resolve: {
          toEdit: function() {
            return $scope.notebook;
          },
          libraryId: function() { return $scope.notebook.libraryId; }
        }
      }).result.then(load);
    };

    $scope.delete = function() {
      var notebook = $scope.notebook;
      alertService.deleteConfirm(
          "Está a punto de eliminar el cuaderno \"" +
          notebook.name + "\". Perderá todo el contenido, incluyendo páginas.\n\n" +
          "Para confirmar que esto no es un error, escriba el nombre del cuaderno a continuación:",
          notebook.name)
          .then(function() {
            return $http.delete(apiUrl + "/notebooks/" + notebook.id);
          }).then(function() {
            $location.path("/");
          });
    };

    $scope.editShares = function() {
      $modal.open({
        templateUrl: 'templates/sharesEditorDialog.html',
        controller: 'SharesEditorDialogController',
        resolve: {
          notebookId: function() { return $scope.notebook.id; }
        }
      }).result.then(reloadShares);
    };

    load();
    reloadShares();

    $scope.mode = "Draw"; //Default setting
    $scope.svg = "";
    $scope.color = "#000000";
    $scope.fonttypes = ["Arial", "Comic Sans MS"];
    $scope.format = {
        'font-family': 'Arial',
        'color': '#000000'
    };
    $scope.equation = "";

    document.execCommand('styleWithCSS', true, null); // to put the rich text inside of css

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

    $scope.putEquation = function() {
      $scope.mode = "Equation";
      $modal.open({
        templateUrl: 'templates/equationDialog.html',
        controller: 'equationController'
      }).result.then(function (result) {
        $scope.equation = result;
      });
    };

    $scope.$watch("format['font-family']", function() {
        document.execCommand("fontName", false, $scope.format['font-family']);
    }, true);

    $scope.$watch('format.color', function() {
        document.execCommand("foreColor", false, $scope.format['color']);
    }, true);
});