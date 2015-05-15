describe("Service: appConfig", function() {
  beforeEach(function() {
    module('VNoteBookApp');
  });

  var appConfig, localStorageService;
  var storage;

  beforeEach(function() {
    inject(function(_localStorageService_, _appConfig_) {
      localStorageService = _localStorageService_;
      appConfig = _appConfig_;
    });
  });

  describe("UserIsLeftHanded setting", function() {
    var settingKey = "UserIsLeftHanded";

    it("should return a value when calling the getter", function() {
      spyOn(localStorageService, 'getItem').and.returnValue('a value');

      var actualValue = appConfig.getUserIsLeftHanded();
      expect(localStorageService.getItem).toHaveBeenCalledWith(settingKey);
      expect(actualValue).toBe('a value');
    });

    it("should save the value when calling the setter", function() {
      spyOn(localStorageService, 'setItem');

      var actualValue = appConfig.setUserIsLeftHanded(false);
      expect(localStorageService.setItem).toHaveBeenCalledWith(settingKey,
        false);
    });

    it("should return a default value when calling the getter and no data is " +
    "available in localStorage", function() {
      spyOn(localStorageService, 'getItem').and.returnValue(null);

      var actualValue = appConfig.getUserIsLeftHanded();
      expect(localStorageService.getItem).toHaveBeenCalledWith(settingKey);
      expect(actualValue).toBe(false); // Default value for this property
    });
  });
});
