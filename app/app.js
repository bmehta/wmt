'use strict';

/*
TODO
- unit tests
- better UI using bootstrap
- e2e tests
 */

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'myApp.dataservice',
    'myApp.cacheservice',
    'myApp.search',
    'myApp.detail'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/search'}); // Default view
}]);
