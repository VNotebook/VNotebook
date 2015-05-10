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
                    title: "Biblioteca 1",
                    notebooks: [0, 1]
                },
                {
                    id: 1,
                    title: "Biblioteca 2",
                    notebooks: [2, 3]
                }
            ],
            notebooks : [
                {
                    id: 0,
                    title: "Cuaderno 0"
                },
                {
                    id: 1,
                    title: "Cuaderno 1"
                },
                {
                    id: 2,
                    title: "Cuaderno 2"
                },
                {
                    id: 3,
                    title: "Cuaderno 3"
                }
            ],
            getLibraryById : function (id) {
                for(var i = 0; i < this.libraries.length; ++i) {
                    if(this.libraries[i].id == id) {
                        return this.libraries[i];
                    }
                }
            },
            getNotebookById : function (id) {
                for(var i = 0; i < this.notebooks.length; ++i) {
                    if(this.notebooks[i].id == id) {
                        return this.notebooks[i];
                    }
                }
            }
        };
    });

application.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function(location) {
        return location.indexOf($location.path()) === 0;
    };
});
