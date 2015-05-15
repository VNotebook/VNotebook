# VNotebook

Master branch: [![Build Status](https://travis-ci.org/VNotebook/VNotebook.svg?branch=master)](https://travis-ci.org/VNotebook/VNotebook)

Web notebook

## Client app environment setup

Make sure you have [npm](https://docs.npmjs.com/getting-started/what-is-npm) installed, `cd` into **angular-app** and execute the following commands:

1. Install Bower (if you haven't already) and gulp: `npm install -g bower gulp`
2. Install the test tools: `npm install -g karma-cli protractor`
3. Install the dependencies: `npm install` followed by `bower install`
4. Setup webdriver to run E2E tests: `webdriver-manage update`
5. If you're on Windows, make sure **%AppData%\npm** is included in your `PATH`

## Running tests

* Unit tests: `cd` into **angular-app/test** and `karma start`. By default, Karma will watch for changes and re-run the tests when needed.
If you want a single run, you can use `karma start --single-run` instead
* E2E tests: from  **angular-app** run `gulp e2e`. This will run a development (non-grails) server. If you want to run a different server, you can setup it to listen on http://localhost:8080 and run `protractor test\protractor.config.js`

## Development workflow

Assuming you `cd` into **angular-app**, you can:
* Start a live-reload, development server using `gulp livereload`. This will serve from **www** and will automatically reload the page whenever a file changes, compile SASS and update the JS references in index.html (available at http://localhost:8080).
* Start a non-live-reload, development server using `gulp serve` (available at http://localhost:8080)
* Compile SASS (manually) using `gulp sass`
* Watch for changes in JS and SASS files to automatically compile and update index.html using `gulp watch`
