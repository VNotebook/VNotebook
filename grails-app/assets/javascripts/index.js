'use strict';

var application = angular.module('VNoteBookApp', ['ngRoute'])
    .config( function($routeProvider) {
        $routeProvider
            .when('/bibliotecas', {
                templateUrl: 'html/libraries.html',
                controller: 'LibrariesController'
            })
            .when('/configuracion', {
                templateUrl: 'html/config.html',
                controller: 'ConfigurationController'
            })
            .otherwise({
                redirectTo: '/bibliotecas'
            });
    });

application.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function(location) {
        return location.indexOf($location.path()) === 0;
    };
});
