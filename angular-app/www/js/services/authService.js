'use strict';

application.factory('authService', function($http, $rootScope, tokenUrl) {
  var service;
  service = {
    login: function(username, password) {
      this.token = this.user = null;
      return $http.post(tokenUrl, {
        username: username,
        password: password
      },
      {
        // The server returns 401 when credentials are not correct, so this
        // avoids it to show another login dialog
        skipAuthInterceptor: true
      }).then(function(response) {
        service.token = response.data["access_token"];
        service.user = {
          username: username,
          roles: response.data["roles"]
        };

        $rootScope.$broadcast("auth.changed");

        return response;
      });
    },
    logout: function() {
      service.token = service.user = null;
      $rootScope.$broadcast("auth.changed");
    },
    isLoggedIn: function() {
      return service.token != null;
    },
    token: null,
    user: null
  };

  return service;
});
