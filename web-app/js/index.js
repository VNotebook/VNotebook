'use strict';
/*
var as = angular.module('VNoteBookApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/generos', {
                templateUrl: 'html/genres/index.html',
                controller: 'GenreListCtrl'
            })
            .when('/nuevoGenero', {
                templateUrl: 'html/genres/createGenre.html',
                controller: 'NewGenreCtrl'
            });
            .otherwise({
                redirectTo: '/generos'
            });
    });

as.controller('HeaderController', function($scope, $location) {
    $scope.isActive = function(location) {
        return location.indexOf($location.path()) === 0;
    };
});


as.controller('GenreListCtrl', function($scope, $rootScope, $http, $location) {
    var load = function() {
        $http.get('http://localhost:8080/framework-examples/genre.json')
            .success(function(data, status, headers, config) {
                $scope.genres = data;
            });
    };

    load();

    $scope.addGenre = function() {
        console.log('call addGenre');
        $location.path('/nuevoGenero');
    };

    $scope.editGenre = function(index) {
        console.log('call editGenre');
        $location.path('/edit/' + $scope.genres[index].id);
    };

    $scope.delGenre = function(index) {
        console.log('call delGenres');
        var todel = $scope.genres[index];
        $http
            .delete($rootScope.appUrl + '/genres/' + todel.id + '.json')
            .success(function(data, status, headers, config) {
                load();
            }).error(function(data, status, headers, config) {
            });
    };

});

as.controller('NewGenreCtrl', function($scope, $rootScope, $http, $location) {
    $scope.genre = {movies: [], name: '', id: 2};

    $scope.saveGenre = function() {
        console.log('call saveGenre');
        $http
            .post('http://localhost:8080/framework-examples/genre.json', $scope.genre)
            .success(function(data, status, headers, config) {
                $location.path('/generos');
            }).error(function(data, status, headers, config) {
            });
    };
});
*/