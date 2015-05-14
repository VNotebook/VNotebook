./grailsw refresh-dependencies
./grailsw compile
./grailsw test-app

cd angular-app
npm install bower karma-cli
npm install
bower install
karma start --single-run --browsers PhantomJS test/karma/karma.conf.js
