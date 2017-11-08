'use strict';

describe('myApp.detail module', function() {

    var dataService;

    beforeEach(module('myApp.detail'));

    // Tests for the view controller
    describe('view controller tests', function(){

        it('should inject mock data service and expect definitions', inject(function($controller, $rootScope, $q) {
            //mock the dataService
            dataService = {
                getTotal: function(){return $q.when(3)},
                getFibonacci: function(){return $q.when([0,1,1,2,3])},
                getHistory: function(){return $q.when([1,2])},
                doPost: function(){return $q.when()}
            };

            var $scope = $rootScope.$new();
            var viewCtrl = $controller('ViewCtrl', {$scope: $scope, dataService: dataService});

            expect(viewCtrl).toBeDefined();
            expect(viewCtrl.fibonacciNumbers).toBeDefined();
            expect(viewCtrl.history).toBeDefined();
            expect(viewCtrl.trackSelected).toBeDefined();

            viewCtrl.request1().then(function(){
                expect(viewCtrl.fibonacciNumbers).toBe([0,1,1,2,3]);
            });

            viewCtrl.request2().then(function(){
                expect(viewCtrl.currentTotal).toBe(3);
            });

            viewCtrl.request3().then(function(){
                expect(viewCtrl.history).toBe([1,2]);
            });

            viewCtrl.selectedNumber = 3;

            viewCtrl.trackSelected().then(function(){
                expect(viewCtrl.currentTotal.toBe(6));
                expect(viewCtrl.history).toBe([1,2,3]);
            })

        }));

    });
});