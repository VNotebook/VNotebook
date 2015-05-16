describe('Service: authInterceptor', function() {
  beforeEach(function() {
    module(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });
    module('VNoteBookApp');
  });

  var $httpBackend, $http, $q, authService, loginRequestHandler;
  beforeEach(function() {
    inject(function(_$httpBackend_, _$http_,  _$q_, _authService_,
      _loginRequestHandler_) {
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      $q = _$q_;
      authService = _authService_;
      loginRequestHandler = _loginRequestHandler_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  var endpoint = "http://localhost/test";

  it('should add the X-Auth-Token header when a token is available', function() {
    var token = authService.token = "the token";
    $httpBackend.expectGET(endpoint, function(headers) {
      return headers['X-Auth-Token'] === token;
    }).respond(200, '');

    $http.get(endpoint);
    $httpBackend.flush();
  });

  it('should not add the X-Auth-Token header when no token is available',
  function() {
    var token = authService.token = null;
    $httpBackend.expectGET(endpoint, function(headers) {
      return !('X-Auth-Token' in headers);
    }).respond(200, '');

    $http.get(endpoint);
    $httpBackend.flush();
  });

  it('should not add the X-Auth-Token header when explicitly skipped', function() {
    var token = authService.token = "the token";
    $httpBackend.expectGET(endpoint, function(headers) {
      return !('X-Auth-Token' in headers);
    }).respond(200, '');

    $http.get(endpoint, {skipAuthInterceptor: true});
    $httpBackend.flush();
  });

  it('should attempt to login and retry the request when the server returns 401',
  function() {
    var newContent = "some content";
    $httpBackend.expectGET(endpoint).respond(401, '');

    spyOn(loginRequestHandler, 'requestLogin').and
      .callFake(function() {
        var deferred = $q.defer();
        authService.token = "a token";
        $httpBackend.expectGET(endpoint).respond(200, newContent,
        function(headers) {
          return headers['X-Auth-Token'] === "a token";
        });
        deferred.resolve();

        return deferred.promise;
      });

    authService.token = null;

    var response;
    $http.get(endpoint).then(function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(loginRequestHandler.requestLogin).toHaveBeenCalled();
    expect(response.data).toBe(newContent);
  });

  it('should attempt to login and, if failed, keep the original headers for rejection',
  function() {
    var content = "some content";
    $httpBackend.expectGET(endpoint).respond(401, content);

    spyOn(loginRequestHandler, 'requestLogin').and
      .callFake(function() {
        return $q.reject();
      });

    authService.token = null;

    var response;
    $http.get(endpoint).then(undefined, function(data) {
      response = data;
    });
    $httpBackend.flush();

    expect(loginRequestHandler.requestLogin).toHaveBeenCalled();
    expect(response.data).toBe(content);
    expect(response.status).toBe(401);
  });
});
