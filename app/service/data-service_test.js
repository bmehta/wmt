'use strict';

describe('dataService', function() {

    beforeEach(module('myApp.service'));
    var $httpBackend, dataService;
    beforeEach(inject(function(_$httpBackend_, _dataService_){
        $httpBackend = _$httpBackend_;
        dataService = _dataService_;
    }));

    // after each test, this ensure that every expected http calls have been realized and only them
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // Tests for the data service
    it ('calls http backend to get data', function() {
        var urlBase = 'http://api.walmartlabs.com/v1';
        var apiKey = 'd9nr24chkrrd9p4sgck8v5ub';
        var jsonp = 'callback=JSON_CALLBACK';

        var searchResponse = {query: 'toaster', itemCount:10 };
        var productDetailResponse = {itemId: 12417832, name:'MLB'};
        var recommendationsResponse = [{itemId:49650093, name:'ASR'}, {itemId: 49650094, name: 'LCT'}];

        $httpBackend
            .when('JSONP', urlBase + '/search?apiKey=' + apiKey + '&query=toaster' + '&' + jsonp)
            .respond(200, {data:searchResponse});

        $httpBackend
            .when('JSONP', urlBase + '/items/12417832?apiKey=' + apiKey + '&' + jsonp)
            .respond(200, {data: productDetailResponse});

        $httpBackend
            .when('GET', urlBase + '/nbp?apiKey=' + apiKey + '&itemId=49650088')
            .respond(200, {data: recommendationsResponse});

        dataService.getSearch('toaster').success(function(result) {
            expect(result.data).toEqual(searchResponse);
        });

        dataService.getProductDetail(12417832).success(function(result) {
            expect(result.data).toEqual(productDetailResponse);
        });

        dataService.getRecommendations(49650088).success(function(result) {
            expect(result.data).toEqual(recommendationsResponse);
        });

        $httpBackend.flush();

    });
});