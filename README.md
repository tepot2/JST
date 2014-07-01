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

## Updating configuration

The _config.js_ file holds any configuration that the tests might
require. Change the value of browser to your needs. You also have the option to
turn on debugging, which will output the JSON of all commands passed to and from
the WebDriver server.

For convenience when accepting new tests, you can add a _config_local.js_ file
to the root directory, and specify your configuration preferences there. This 
will take preference over the _config.js_ file, but will be ignored by git, 
allowing you to maintain a configuration environment easily.
