'use strict';

/*
TODO
- unit tests
- better UI using bootstrap
- e2e tests
- CORS error for recommendations api (document)
- product lookup and throttling for recommendations
- handle no recommendations errors - nbp?apiKey=d9nr24chkrrd9p4sgck8v5ub&itemId=14871803
- Move out CSS styles to app.css
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
