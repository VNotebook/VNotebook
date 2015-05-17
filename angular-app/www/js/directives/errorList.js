application.directive('errorList', function() {
  return {
    scope: {
      errors: '&'
    },
    templateUrl: 'templates/errorList.html'
  };
});
