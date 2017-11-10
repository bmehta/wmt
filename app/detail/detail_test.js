'use strict';

describe('myApp.detail module', function() {

    var dataService;
    var cacheService;

    beforeEach(module('myApp.detail'));

    // Tests for the view controller
    describe('Detail controller tests', function(){

        it('should inject mock data service and expect definitions', inject(function($controller, $rootScope, $q) {
            //mock the dataService
            dataService = {
                getSearch: function(query){return $q.when({query: 'toaster', itemCount:10 })},
                getProductDetail: function(itemId){return $q.when({itemId: 12417832, name:'MLB'})},
                getRecommendations: function(itemId){return $q.when([{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}])}
            };

            cacheService = {
                getSearchResult: function(){return 'soap'}
            };

            var detailCtrl = $controller('DetailCtrl', {dataService: dataService, cacheService: cacheService});

            expect(detailCtrl).toBeDefined();
            expect(detailCtrl.searchResult).toBeDefined();
            expect(detailCtrl.recommendations).toBeDefined();
            expect(detailCtrl.init).toBeDefined();

            detailCtrl.getRecommendations(12417832).then(function(){
                expect(detailCtrl.recommendations).toBe([{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}])
            });

        }));

    });
});