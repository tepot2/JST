# W3C Browser Automation Specification Tests

This repository defines a set of conformance tests for the W3C web
browser automation specification known as WebDriver.

## How to run the tests

1. Clone or download the repository using the links on the right.
2. Install Node.js http://nodejs.org/
3. Download the Selenium Server http://docs.seleniumhq.org/download/
4. Install Java http://www.java.com/en/download/index.jsp if necessary.
5. Run the server with "java -jar selenium-server-standalone-2.42.2.jar"
   (your version number might be different).
6. Open a Node.js command prompt window and navigate to the root directory
   of this repository.
7. Install the necessary node packages with "npm install node-uuid" and "npm 
   install colors".
8. Install Firefox or update the config.js file to run your browser. Note that
   using another browser will likely require you to download additional 
   software. By default, the tests will run in Firefox with debugging disabled.
9. Run the tests with "node runtests.js" (entered in Node.js command prompt).

The results of the tests will be output to the console as well as 
_logfile.json_, which stores all results in JSON.

## Updating configuration

The _config.js_ file holds any configuration that the tests might
require. Change the value of browser to your needs. You also have the option to
turn on debugging, which will output the JSON of all commands passed to and from
the WebDriver server.

For convenience when accepting new tests, you can add a _config_local.js_ file
to the root directory, and specify your configuration preferences there. This 
will take preference over the _config.js_ file, but will be ignored by git, 
allowing you to maintain a configuration environment easily.

## Platforms and Browsers
This test suite has been tested against Firefox, Internet Explorer, and Chrome.
Tests can be run against Firefox without modification. In order to test against
Chrome, download chromedriver.exe 
(http://code.google.com/p/selenium/wiki/ChromeDriver) and either add it to your
path or specify its location when you start the selenium server. When launching
the selenium server, use -Dwebdriver.chrome.driver=C:\Path\to\chromedriver.exe 
to specify the location of chromedriver.

These tests have been run successfully on Windows and Linux (Ubuntu) without 
modification. If you have difficulty running the tests on any other platform, 
check the sync_command function of _driver.js_ and the send_request function in
_http_request.js_, since these deal with forking, file i/o, and process
arguments, any of which could cause portability issues.