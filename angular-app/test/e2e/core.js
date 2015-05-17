describe("Core functionality", function() {
  it("should allow users to login", function() {
    browser.get("");

    var loginButton = element(by.buttonText('Ingresar'));
    loginButton.click();

    element(by.model("credentials.username")).sendKeys("test");
    element(by.model("credentials.password")).sendKeys("test123\n");

    expect($('[ng-controller="HeaderController"]').getText().then(function(text) {
      return text.indexOf("Bienvenido, test");
    })).not.toBe(-1);
  });
});
