'use strict';

// Service to return data from numbers http server
angular.module('myApp.service',[])
    .factory('cacheService', [function() {

        var cacheService = {};
        var searchResults = [];
        var searchResultsMap = new Map();
        var searchTerm = '';

        cacheService.addSearchTerm = function(search) { // Cache the search term
          searchTerm = search;
        };

        cacheService.getSearchTerm = function() {  // Retrieve the search term
            return searchTerm;
        };

        cacheService.addSearchResults = function(results) { // Cache search results
            searchResults = results;
            for (var i =0; i< results.length; i++){
                searchResultsMap.set(results[i].itemId, results[i]);
            }
        };

        cacheService.containsSearchResults = function(){ // Check if search results are cached
            return searchResults.length > 0;
        };

        cacheService.getSearchResults = function(){ // Retrieve search results
            return searchResults;
        };

        cacheService.getSearchResult = function(itemId){ // Return a particular search result
            return searchResultsMap.get(itemId);
        };

        return cacheService;
    }]);
