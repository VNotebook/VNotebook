application.controller('EventEditorDialogController', function($scope, $http, apiUrl) {
	$scope.newEvent = {
		title: 'Nuevo Evento',
		type: 'Información',
		startsAt: new Date(),
		endsAt: new Date()
	};

	$scope.toggle = function($event, field, event) {
		$event.preventDefault();
		$event.stopPropagation();
		event[field] = !event[field];
	};

	$scope.save = function() {
		$scope.errors = null;
		$scope.newEvent.startsAt = $scope.newEvent.startsAt.getTime();
		$scope.newEvent.endsAt = $scope.newEvent.endsAt.getTime();
	    $http.post(apiUrl + "/events", $scope.newEvent).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	};
});