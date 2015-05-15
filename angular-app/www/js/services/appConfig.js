'use strict';

application.factory('appConfig', function(localStorageService) {
  var result = {};

  function addSetting(name, defaultValue) {
    result['get' + name] = function() {
      var value = localStorageService.getItem(name);
      if (typeof value === 'undefined') {
        return defaultValue;
      }

      return value;
    };

    result['set' + name] = function(value) {
      localStorageService.setItem(name, value);
    };
  }

  addSetting('UserIsLeftHanded', false);

  return result;
});
