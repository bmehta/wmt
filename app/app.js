'use strict';

/*
TODO

- README.md
 - read api documentation
- comments
- utility service
- footer
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
