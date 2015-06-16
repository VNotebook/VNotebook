(function() {
  function wrapStorage(storage) {
    return {
      getItem: function(key) {
        return angular.fromJson(storage.getItem(key));
      },
      setItem: function(key, item) {
        storage.setItem(key, angular.toJson(item));
      }
    };
  }

  application.factory('localStorageService', function($window) {
    return wrapStorage($window.localStorage);
  });

  application.factory('sessionStorageService', function($window) {
    return wrapStorage($window.sessionStorage);
  });
})();
