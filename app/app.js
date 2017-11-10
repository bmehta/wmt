'use strict';

/*
TODO

- README.md
- CORS error for recommendations api (document)
 - Move out CSS styles to app.css
- product lookup and throttling for recommendations
- comments
- utility service
- footer
- read api documentation
- remove bower_components from github
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
