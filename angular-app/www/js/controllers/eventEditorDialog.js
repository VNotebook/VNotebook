application.controller('EventEditorDialogController', function($scope) {
	$scope.newEvent = {
		title: 'Nuevo Evento',
		type: 'Info'
	};

	$scope.toggle = function($event, field, event) {
		$event.preventDefault();
		$event.stopPropagation();
		event[field] = !event[field];
	};

	$scope.save = function() {
		//Missing
		$scope.$close();
	};
});