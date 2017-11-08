'use strict';

// Service to return data from numbers http server
angular.module('myApp.service',[])
    .factory('cacheService', ['$http', function($http) {

        var searchResults = [];

        dataService.addSearchResults = function(results) {
            searchResults =  results;
        };

        dataService.containsSearchResults = function(){
            return searchResults.length > 0;
        };

        dataService.getSearchResults = function(){
            return searchResults;
        };

        return dataService;
    }]);
