'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.when('/detail/:itemid', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailCtrl as vm'
        });
    }])

    .controller('DetailCtrl', ['$sce', 'dataService', 'cacheService', '$routeParams', function ($sce, dataService, cacheService, $routeParams) {
        var vm = this;
        var itemId = parseInt($routeParams.itemid);
        console.log('itemid: ' + itemId);
        vm.searchResult = {};
        vm.recommendations = [];
        vm.noRecommendationsFound = false;
        vm.error = false;

        vm.getRecommendations = function() {
            dataService.getRecommendations(vm.searchResult.itemId)
                .then(function(res){
                    vm.recommendations = res.data.slice(0,10);
                }, function(error){
                    console.error('Could not get recommendations: ' + JSON.stringify(error));
                })
        };

        vm.init = function() {
            vm.searchResult = cacheService.getSearchResult(itemId);
            console.log('searchResult: ' + JSON.stringify(vm.searchResult));
            if (!vm.searchResult) {
                dataService.getProductDetail(itemId)
                    .then(function (result) {
                        vm.searchResult = result.data;
                        vm.getRecommendations();
                        console.log('searchResult: ' + JSON.stringify(vm.searchResult));
                    }, function (error) {
                        console.error('Could not get product detail: ' + JSON.stringify(error));
                    });
            }
            else{
                console.log('searchResult: ' + JSON.stringify(vm.searchResult));
                vm.getRecommendations();
            }
            
        };

        vm.init();

        vm.renderHTML = function(html_code){
            var decoded = angular.element('<textarea />').html(html_code).text();
            return $sce.trustAsHtml(decoded);
        }

    }]);