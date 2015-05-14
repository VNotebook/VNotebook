exports.config = {
  // Run selenium automatically
  seleniumAddress: null,
  capabilities: {
    'browserName': 'chrome'
  },
  specs: [
    'e2e/**/*.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
  },
  allScriptsTimeout: 20000,
  baseUrl: 'http://localhost:8080',
};
