'use strict';

application.factory('authInterceptor', function ($q, $injector) {
  // We need to use $injector to get the services when a request is intercepted
  // to prevent cyclic dependencies
  return {
    'request': function(config) {
      if (!config.skipAuthInterceptor) {
        var authService = $injector.get('authService');
        if (authService.token != null) {
          config.headers['X-Auth-Token'] = authService.token;
        }
      }

      return config;
    },
    'responseError': function(rejection) {
      if (!rejection.config.skipAuthInterceptor) {
        if (rejection.status === 401) {
          var $http = $injector.get('$http');
          var loginRequestHandler = $injector.get('loginRequestHandler');
          var deferred = $q.defer();

          // Attempt to login. If successful, retry the request. Otherwise,
          // reject the promise with the original rejection status
          loginRequestHandler.requestLogin().then(deferred.resolve, function() {
            deferred.reject(rejection);
          });

          return deferred.promise.then(function() {
            // Retry the request
            return $http(rejection.config);
          });
        }
      }

      return $q.reject(rejection);
    }
  };
});
