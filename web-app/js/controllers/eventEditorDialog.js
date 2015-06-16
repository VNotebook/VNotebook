application.controller('EventEditorDialogController', function($scope, $http, apiUrl, editEvent) {
	var update = function() {
		$scope.errors = null;
	    $http.put(apiUrl + "/events/" + $scope.event.id, $scope.event).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	};

	var add = function() {
		$scope.errors = null;
	    $http.post(apiUrl + "/events", $scope.event).then(function() {
	      $scope.$close();
	    }, function(response) {
	      $scope.errors = response.data && response.data['errors'];
	    });
	};

	$scope.initEvent = function() {
		$scope.event = editEvent.getEvent();
	};

	$scope.toggle = function($event, field, event) {
		$event.preventDefault();
		$event.stopPropagation();
		event[field] = !event[field];
	};

	$scope.save = function() {
		$scope.event.startsAt = new Date($scope.event.startsAt).getTime();
        $scope.event.endsAt = new Date($scope.event.endsAt).getTime();
		if ( editEvent.isEditing() == false ) {
			add();
		} else {
			update();
			editEvent.resetEvent();
		}
	};
});