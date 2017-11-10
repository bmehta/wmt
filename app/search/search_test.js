'use strict';

describe('myApp.search module', function() {

    var dataService;
    var cacheService;

    beforeEach(module('myApp.search'));

    // Tests for the view controller
    describe('search controller tests', function(){

        it('should inject mock data service and expect definitions', inject(function($controller, $rootScope, $q) {
            //mock the dataService
            dataService = {
                getSearch: function(query){return $q.when({query: 'toaster', itemCount:10 })},
                getProductDetail: function(itemId){return $q.when({itemId: 12417832, name:'MLB'})},
                getRecommendations: function(itemId){return $q.when([{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}])}
            };

            cacheService = {
                getSearchTerm: function(){return 'soap'},
                getSearchResult: function(itemId){return {itemId:49650093, name:'ASR'}},
                getSearchResults: function(){return [{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}]}
            };

            var searchCtrl = $controller('SearchCtrl', {dataService: dataService, cacheService: cacheService});

            expect(searchCtrl).toBeDefined();
            expect(searchCtrl.searchQuery).toBeDefined();
            expect(searchCtrl.detailedSearchResults).toBeDefined();
            expect(searchCtrl.searchProducts).toBeDefined();
            searchCtrl.searchProducts().then(function(){
                expect(vm.detailedSearchResults).toEqual({itemId: 12417832, name:'MLB'});
            })

        }));

    });
});