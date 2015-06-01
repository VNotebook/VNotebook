application.controller('EventEditorDialogController', function($scope, $http, apiUrl) {
	$scope.newEvent = {
		title: 'Nuevo Evento',
		type: 'Información',
		startDate: new Date(),
		endDate: new Date()
	};

	$scope.toggle = function($event, field, event) {
		$event.preventDefault();
		$event.stopPropagation();
		event[field] = !event[field];
	};

	$scope.save = function() {
		$scope.errors = null;
		$scope.newEvent.startDate = $scope.newEvent.startDate.getTime();
		$scope.newEvent.endDate = $scope.newEvent.endDate.getTime();
	    $http.post(apiUrl + "/events", $scope.newEvent).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	};
});