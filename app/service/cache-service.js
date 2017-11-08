'use strict';

// Service to return data from numbers http server
angular.module('myApp.service')
    .factory('cacheService', [function() {

        var cacheService = {};
        var searchResults = [];
        var searchResultsMap = new Map();

        cacheService.addSearchResults = function(results) {
            for (var i =0; i< results.length; i++){
                searchResultsMap.set(results[i].itemId, results[i]);
            }
        };

        cacheService.containsSearchResults = function(){
            return searchResults.length > 0;
        };

        cacheService.getSearchResults = function(){
            return searchResults;
        };

        cacheService.getSearchResult = function(itemId){
            searchResultsMap.get(itemId);
        };

        return cacheService;
    }]);
