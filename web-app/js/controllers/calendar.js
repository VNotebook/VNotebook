'use strict';

application.controller('CalendarController', function($scope, $modal, Elements) {
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

  $scope.$on("auth.changed", load);
  load();
});