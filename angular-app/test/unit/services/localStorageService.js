describe("Service: localStorageService", function() {
  beforeEach(function() {
    module('VNoteBookApp');
  });

  var localStorageService, localStorage;

  beforeEach(function() {
    inject(function(_localStorageService_, _$window_) {
      localStorageService = _localStorageService_;
      localStorage = _$window_.localStorage;
    });
  });

  it("should serialize an object to JSON when using set() and save to localStorage",
  function() {
    spyOn(localStorage, 'setItem');

    var item = {
      string: "a string",
      number: 123.456,
      nested: {
        "spaced key": 123
      }
    };

    localStorageService.setItem('theKey', item);
    expect(localStorage.setItem).toHaveBeenCalled();
    var args = localStorage.setItem.calls.argsFor(0);
    expect(args[0]).toBe('theKey');
    expect(typeof args[1]).toBe('string');
    expect(angular.fromJson(args[1])).toEqual(item);
  });

  it("should deserialize a JSON object from localStorage when using get",
  function() {
    var item = {
      string: "a string",
      number: 123.456,
      nested: {
        "spaced key": 123
      }
    };

    spyOn(localStorage, 'getItem').and.returnValue(angular.toJson(item));

    var retrievedItem = localStorageService.getItem('theKey');
    expect(localStorage.getItem).toHaveBeenCalledWith('theKey');
    expect(retrievedItem).toEqual(item);
  });
});
