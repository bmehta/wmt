# `wmt` — the "Walmart Product Search" responsive Single Page application built using AngularJS and Bootstrap.

## Getting Started

To get you started you can simply clone the `wmt` repository and install the dependencies:

### Prerequisites

You need git to clone the `wmt` repository.

We also use a number of Node.js tools to initialize and test `wmt`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

You will need a way to bypass browser CORS limitation for the Walmart Labs Recommendation API. The way to get around CORS is JSONP. The JSONP implementation for the response of the recommendations call is off, and hence we need a way to get around it.
Perform testing in Chrome after installing the extension "https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en". Add a URL pattern to it - "http://*/*".
The JSONP workaround works just fine for the Search and Product Lookup API calls.

### Clone `wmt`

Clone the `wmt` repository using git:

```
git clone https://github.com/bmehta/wmt.git
cd wmt
```

### Install Dependencies

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`wmt` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  service/           --> all app specific services
      cache-service.js     --> caching service
      cache-service_test.js --> tests for the cache service
      data-service.js      --> data service
      data-service_test.js --> tests for the data service
  detail/                --> the detail view template and logic
    detail.html            --> the partial template
    detail.js              --> the controller logic
    detail_test.js         --> tests of the controller
  search/                --> the search view template and logic
     search.html            --> the partial template
     search.js              --> the controller logic
     search_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```


## Testing

There are two kinds of tests in the `wmt` application: Unit tests and end-to-end tests.

### Running Unit Tests

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have an `_test.js` suffix (e.g.
  `detail_test.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```


<a name="e2e-testing"></a>
### Running End-to-End Tests

* The configuration is found at `e2e-tests/protractor-conf.js`.
* The end-to-end tests are found in `e2e-tests/scenarios.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor can
interact with it.

**Before starting Protractor, open a separate terminal window and run:**

```
npm start
```

In addition, since Protractor is built upon WebDriver, we need to ensure that it is installed and
up-to-date.

```
npm run update-webdriver
```

Once you have ensured that the development web server hosting our application is up and running, you
can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires
the [Java Development Kit (JDK)][jdk] to be installed on your local machine. Check this by running
`java -version` from the command line.

