application.controller('CalendarController', function($scope, $modal, loginRequestHandler) {
	$scope.calendarView = 'month';
	$scope.currentDay = new Date();
	$scope.events = [];

  $scope.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  $scope.add = function() {
    $modal.open({
      templateUrl: 'templates/eventEditorDialog.html',
      controller: 'EventEditorDialogController'
    });
  };

});