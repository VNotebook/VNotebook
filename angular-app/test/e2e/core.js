describe("Core functionality", function() {
  it("should allow users to login", function() {
    browser.get("");

    // Cancel initial dialog, dismiss alert and trigger login manually
    element(by.buttonText("Cerrar")).click();
    browser.switchTo().alert().then(function(alert) {
      return alert.dismiss();
    });

    var loginButton = element(by.buttonText('Ingresar'));
    loginButton.click();

    element(by.toExport("credentials.username")).sendKeys("test");
    element(by.toExport("credentials.password")).sendKeys("test123\n");

    expect($('[ng-controller="HeaderController"]').getText().then(function(text) {
      return text.indexOf("Bienvenido, test");
    })).not.toBe(-1);
  });
});
