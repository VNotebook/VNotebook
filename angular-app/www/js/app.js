'use strict';

var application = angular.module('VNoteBookApp', ['ngRoute', 'ui.bootstrap']);

application.config( function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/bibliotecas', {
    templateUrl: 'templates/libraries.html',
    controller: 'LibrariesController'
  })
  .when('/cuadernos/:libraryId', {
    templateUrl: "templates/notebooks.html",
    controller: 'NotebooksController'
  })
  .when('/cuaderno/:notebookId', {
    templateUrl: "templates/notebook.html",
    controller: "NotebookController"
  })
  .otherwise({
    redirectTo: '/bibliotecas'
  });
  $httpProvider.interceptors.push('authInterceptor');
})
.constant("tokenUrl", "/vnotebook/auth/login");
