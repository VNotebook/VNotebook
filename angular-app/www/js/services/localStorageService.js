application.factory('localStorageService', function($window) {
  var localStorage = $window.localStorage;
  return {
    getItem: function(key) {
      return angular.fromJson(localStorage.getItem(key));
    },
    setItem: function(key, item) {
      localStorage.setItem(key, angular.toJson(item));
    }
  };
});
