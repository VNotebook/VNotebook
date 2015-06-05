'use strict';

var application = angular.module('VNoteBookApp', ['ngRoute', 'ui.bootstrap', 
    'colorpicker.module', 'mwl.calendar']);

application.config( function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/bibliotecas', {
    templateUrl: 'templates/libraries.html',
    controller: 'LibrariesController'
  })
  .when('/bibliotecas/:libraryId', {
    templateUrl: "templates/library.html",
    controller: 'LibraryController'
  })
  .when('/cuaderno/:notebookId', {
    templateUrl: "templates/notebook.html",
    controller: "NotebookController"
  })
  .when('/calendario', {
    templateUrl: "templates/calendar.html",
    controller: "CalendarController"
  })
  .otherwise({
    redirectTo: '/bibliotecas'
  });
  $httpProvider.interceptors.push('authInterceptor');
})
.constant("tokenUrl", "/vnotebook/auth/login")
.constant("apiUrl", "/vnotebook/api");
