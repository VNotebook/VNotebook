application.service('editEvent', function() {
    var event = {
		title: "Nuevo Evento",
		type: "Información",
		startsAt: new Date(),
		endsAt: new Date()
	};
    var editing = false;

    return {
    	getEvent: function() {
    		return event;
    	},
    	isEditing: function() {
    		return editing;
    	},
    	setEvent: function(value) {
    		editing = true;
    		event = value;
    	},
    	resetEvent: function() {
    		event = {
				title: "Nuevo Evento",
				type: "Información",
				startsAt: new Date(),
				endsAt: new Date()
			};
			editing = false;
    	}
    };
});