'use strict';

application.controller('CalendarController', function($scope, $modal, $http, Elements, apiUrl) {
    $scope.calendarView = 'month';
    $scope.currentDay = new Date();
    $scope.events = [];

    var load = function () {
        Elements.getEvents().then(function(response) {
            $scope.events = response.data;
        }, function() {
            alert("Error al obtener los eventos");
        });
    };

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    $scope.add = function() {
        $modal.open({
            templateUrl: 'templates/eventEditorDialog.html',
            controller: 'EventEditorDialogController'
        }).result.then(load);
    };

    $scope.delete = function() {
    //missing
    };

    $scope.update = function(eventToModifity) {
        $scope.newEvent = eventToModifity;
        $scope.editing = true;
        $http.put(apiUrl + "/events/" + $scope.newEvent.id, $scope.newEvent).then(function() {
          load();
        }, function(response) {
          $scope.errors = response.data && response.data['errors'];
        });
    };

    $scope.$on("auth.changed", load);
    load();
});