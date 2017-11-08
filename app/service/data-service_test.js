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
       var fibonacci = [0,1,1,2,3];
        var history = [1,2];
        var total =3;
        var number=3;
        var payload = {"number": number}
        
        $httpBackend
            .when('GET', 'http://localhost:3000/api/fibonacci')
            .respond(200, {data: fibonacci});

        $httpBackend
            .when('GET', 'http://localhost:3000/api/history')
            .respond(200, {data: history});

        $httpBackend
            .when('GET', 'http://localhost:3000/api/total')
            .respond(200, {data: total});

        $httpBackend
            .when('POST', 'http://localhost:3000/api/post', payload).respond(201, {data:number});

        dataService.getFibonacci().success(function(result) {
            expect(result.data).toEqual(fibonacci);
        });

        dataService.getHistory().success(function(result) {
            expect(result.data).toEqual(history);
        });

        dataService.getTotal().success(function(result) {
            expect(result.data).toEqual(total);
        });

        dataService.doPost(payload).success(function(result){
            expect(result.data).toEqual(number);
        });

        $httpBackend.flush();

    });
});