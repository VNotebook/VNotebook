application.controller('CalendarController', function($scope) {
	$scope.calendarView = 'month';
	$scope.currentDay = new Date(2013,5,1,1);
	$scope.events = [
      {
        title: 'Event 1',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
      },
      {
        title: 'Event 2',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate()
      },
      {
        title: 'This is a really long event title',
        type: 'important',
        startsAt: moment().startOf('day').add(5, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate()
      }
    ];
});