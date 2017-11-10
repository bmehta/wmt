'use strict';

describe('cacheService', function() {

    beforeEach(module('myApp.service'));
    var cacheService;
    beforeEach(inject(function(_cacheService_){
        cacheService = _cacheService_;
    }));

    // Tests for the cache service
    it ('cacheService test functions', function() {
        var searchTerm = 'soda';
        var searchResults = [{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}];
        cacheService.addSearchTerm(searchTerm);
        expect(cacheService.getSearchTerm()).toEqual(searchTerm);

        expect(cacheService.containsSearchResults()).toEqual(false);

        cacheService.addSearchResults(searchResults);
        expect(cacheService.getSearchResults()).toEqual(searchResults);

        expect(cacheService.containsSearchResults()).toEqual(true);

        expect(cacheService.getSearchResult(49650093)).toEqual({itemId:49650093, name:'ASR'});

        expect(cacheService.getSearchResult(49650094)).toEqual({itemId: 49650094, name: 'LCT'});

    });
});