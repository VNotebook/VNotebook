application.controller('EventEditorDialogController', function($scope, $http, apiUrl) {
	$scope.event = {
		title: "Nuevo evento",
		type: "Información",
		startsAt: new Date(),
		endsAt: new Date()
	};
	$scope.newEvent = true;

	var update = function() {
		$scope.errors = null;
	    $http.put(apiUrl + "/events/" + $scope.event.id, $scope.event).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	}

	var add = function() {
		$scope.errors = null;
	    $http.post(apiUrl + "/events", $scope.event).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	}

	$scope.init = function(event) {
		$scope.event = event;
		$scope.newEvent = false;
	}

	$scope.toggle = function($event, field, event) {
		$event.preventDefault();
		$event.stopPropagation();
		event[field] = !event[field];
	};

	$scope.save = function() {
		$scope.event.startsAt = $scope.event.startsAt.getTime();
		$scope.event.endsAt = $scope.event.endsAt.getTime();
		if ( $scope.newEvent == true ) {
			add();
		} else {
			update();
		}
	};
});