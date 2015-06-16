'use strict';

application.factory('authService', function($http, $rootScope, tokenUrl,
  sessionStorageService) {
  var service;

  function clearAuthInfo() {
    setUser(null);
    setToken(null);
  }

  function setToken(token) {
    sessionStorageService.setItem('token', token);
    service.token = token;
  }

  function setUser(user) {
    sessionStorageService.setItem('user', user);
    service.user = user;
  }

  service = {
    login: function(username, password) {
      clearAuthInfo();
      return $http.post(tokenUrl, {
        username: username,
        password: password
      },
      {
        // The server returns 401 when credentials are not correct, so this
        // avoids it to show another login dialog
        skipAuthInterceptor: true
      }).then(function(response) {
        setToken(response.data["access_token"]);
        setUser({
          username: username,
          roles: response.data["roles"]
        });

        $rootScope.$broadcast("auth.changed");

        return response;
      });
    },
    logout: function() {
      clearAuthInfo();
      $rootScope.$broadcast("auth.changed");
    },
    isLoggedIn: function() {
      return service.token != null;
    },
    token: null,
    user: null
  };

  service.token = sessionStorageService.getItem('token');
  service.user = sessionStorageService.getItem('user');

  return service;
});
