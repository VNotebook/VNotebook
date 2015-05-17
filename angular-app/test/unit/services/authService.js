describe("Service: authService", function() {
  beforeEach(function() {
    module('VNoteBookApp');
  });

  var authService, $httpBackend, tokenUrl, $rootScope;

  beforeEach(function() {
    inject(function(_authService_, _$httpBackend_, _tokenUrl_, _$rootScope_) {
      authService = _authService_;
      $httpBackend = _$httpBackend_;
      tokenUrl = _tokenUrl_;
      $rootScope = _$rootScope_;
    });
  });

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
  });

  it("should login and save the token and user data when successful", function() {
    authService.token = null;

    var returnedToken = "some token";
    $httpBackend.expectPOST(tokenUrl, {"username": "user1", "password": "pass"})
      .respond(200, '{"access_token": "' + returnedToken + '", ' +
        '"roles": ["ROLE_USER"]}');

    authService.login("user1", "pass");
    $httpBackend.flush();

    expect(authService.token).toBe(returnedToken);
    expect(authService.user.username).toBe("user1");
    expect(authService.user.roles).toEqual(["ROLE_USER"]);
    expect(authService.isLoggedIn()).toBe(true);
  });

  it("should not fail login when server returns 401", function() {
    authService.token = "old token";
    authService.user = {"username": "something", "roles": ["ROLE_USER"]};

    $httpBackend.expectPOST(tokenUrl, {"username": "user1", "password": "pass"})
      .respond(401, "");

    authService.login("user1", "pass");
    $httpBackend.flush();

    expect(authService.token).toBe(null);
    expect(authService.user).toBe(null);
    expect(authService.isLoggedIn()).toBe(false);
  });

  it("should broadcast auth.changed when logging in or logging out", function() {
    var raised = false;
    function onAuthChanged() {
      raised = true;
    }

    $rootScope.$on('auth.changed', onAuthChanged);

    authService.token = null;

    $httpBackend.expectPOST(tokenUrl, {"username": "user1", "password": "pass"})
      .respond(200, '{"access_token": "some token", ' +
        '"roles": ["ROLE_USER"]}');

    authService.login("user1", "pass");
    $httpBackend.flush();

    expect(raised).toBe(true);
    raised = false;
    authService.logout();
    expect(raised).toBe(true);
  });

  it("should reset the token and user when user logs out", function() {
    authService.token = "old token";
    authService.user = {"username": "something", "roles": ["ROLE_USER"]};

    authService.logout();

    expect(authService.token).toBe(null);
    expect(authService.user).toBe(null);
    expect(authService.isLoggedIn()).toBe(false);
  });
});
