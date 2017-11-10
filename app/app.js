'use strict';

/*
TODO
- unit tests
*- better UI using bootstrap
- e2e tests
- README.md
- CORS error for recommendations api (document)
 - Move out CSS styles to app.css
 - console errors for html decode/escape
- product lookup and throttling for recommendations
- comments
*- handle no recommendations errors - nbp?apiKey=d9nr24chkrrd9p4sgck8v5ub&itemId=14871803
- footer
*- add more details to details page
*- limit to 10 recommendations
 */

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'ngSanitize',
    'myApp.service',
    'myApp.search',
    'myApp.detail'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/search'}); // Default view
}]);
