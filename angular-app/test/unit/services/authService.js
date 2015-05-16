describe("Service: authService", function() {
  beforeEach(function() {
    module('VNoteBookApp');
  });

  var authService, $httpBackend, tokenUrl;

  beforeEach(function() {
    inject(function(_authService_, _$httpBackend_, _tokenUrl_) {
      authService = _authService_;
      $httpBackend = _$httpBackend_;
      tokenUrl = _tokenUrl_;
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

  it("should reset the token and user when user logs out", function() {
    authService.token = "old token";
    authService.user = {"username": "something", "roles": ["ROLE_USER"]};

    authService.logout();

    expect(authService.token).toBe(null);
    expect(authService.user).toBe(null);
    expect(authService.isLoggedIn()).toBe(false);
  });
});
