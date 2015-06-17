'use strict';

application.factory('alertService', function($modal, $rootScope) {
  return {
    error: function(title, message) {
      var scope = $rootScope.$new();

      scope.title = title;
      scope.message = message;

      return $modal.open({
        templateUrl: 'templates/errorAlert.html',
        size: 'sm',
        scope: scope
      }).result;
    },
    deleteConfirm: function(message, name) {
      var scope = $rootScope.$new();

      scope.message = message;
      scope.name = name;

      return $modal.open({
        templateUrl: 'templates/deleteConfirm.html',
        size: 'sm',
        scope: scope
      }).result;
    }
  };
});
