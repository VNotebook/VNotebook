'use strict';

var application = angular.module('VNoteBookApp', ['ngRoute'])
    .config( function($routeProvider) {
        $routeProvider
            .when('/bibliotecas', {
                templateUrl: 'html/libraries.html',
                controller: 'LibrariesController'
            })
            .when('/cuadernos/:libraryId', {
                templateUrl: "html/notebooks.html",
                controller: 'NotebooksController'
            })
            .when('/cuaderno/:notebookId', {
                templateUrl: "html/notebook.html",
                controller: "NotebookController"
            })
            .when('/configuracion', {
                templateUrl: 'html/config.html',
                controller: 'ConfigurationController'
            })
            .otherwise({
                redirectTo: '/bibliotecas'
            });
    })
    .factory('Elements', function() {
        return {
            libraries : [
                {
                    id: 0,
                    title: "biblioteca 1",
                    notebooks: [0, 1]
                },
                {
                    id: 1,
                    title: "biblioteca 2",
                    notebooks: [2, 3]
                }
            ],
            notebooks : [
                {
                    id: 0,
                    title: "cuaderno 0"
                },
                {
                    id: 1,
                    title: "cuaderno 1"
                },
                {
                    id: 2,
                    title: "cuaderno 2"
                },
                {
                    id: 3,
                    title: "cuaderno 3"
                }
            ],
            widgetsPanel : [
                {
                    id: 0,
                    title: "widget 1",
                    buttonClass: "glyphicon glyphicon-camera"
                },
                {
                    id: 0,
                    title: "widget 2",
                    buttonClass: "glyphicon glyphicon-edit"
                }
            ],
            toolsPanel : [
                {
                    id: 0,
                    title: "editar",
                    buttonClass: "glyphicon glyphicon-pencil"
                },
                {
                    id: 0,
                    title: "borrar",
                    buttonClass: "gglyphicon glyphicon-apple"
                }
            ]
        };
    });

application.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function(location) {
        return location.indexOf($location.path()) === 0;
    };
});
