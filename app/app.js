'use strict';

/*
TODO
- unit tests
- better UI using bootstrap
- e2e tests
- CORS error for recommendations api
 */

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'myApp.service',
    'myApp.search',
    'myApp.detail'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/search'}); // Default view
}]);
