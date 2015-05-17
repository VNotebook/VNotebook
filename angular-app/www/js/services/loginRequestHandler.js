'use strict';

application.factory('loginRequestHandler', function($modal) {
  return {
    requestLogin: function() {
      return $modal.open({
        templateUrl: 'templates/loginDialog.html',
        controller: 'LoginDialogController',
        size: 'sm'
      }).result;
    }
  };
});
