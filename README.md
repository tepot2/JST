# W3C Browser Automation Specification Tests

This repository defines a set of conformance tests for the W3C web
browser automation specification known as WebDriver.

## How to run the tests

1. Install Node.js http://nodejs.org/
2. Download the Selenium Server http://docs.seleniumhq.org/download/
3. Install Java http://www.java.com/en/download/index.jsp if necessary
4. Run the server with "java -jar selenium-server-standalone-2.42.2.jar"
   (your version number might be different).
5. Open a Node.js command prompt window and navigate to the root directory.
6. Install the necessary node packages with "npm install node-uuid" and "npm 
   install colors"
7. Update the config.js file if necessary. By default, the tests will only run
   in Firefox with debugging disabled.
8. Run the tests with "node runtests.js" (entered in Node.js command prompt).

## Updating configuration

The _config.js_ file holds any configuration that the tests might
require. Change the value of browser to your needs. You also have the option to
turn on debugging, which will output the JSON of all commands passed to and from
the WebDriver server.