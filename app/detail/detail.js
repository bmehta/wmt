'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.when('/detail/:itemid', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailCtrl as vm'
        });
    }])

    .controller('DetailCtrl', ['$q', '$sce', 'dataService', 'cacheService', '$routeParams', function ($q, $sce, dataService, cacheService, $routeParams) {
        var vm = this;
        var itemId = parseInt($routeParams.itemid);
        console.log('itemid: ' + itemId);
        vm.searchResult = {};
        vm.recommendations = [];
        vm.detailedRecommendations = [];
        vm.noRecommendationsFound = false;
        vm.error = false;
        vm.loading = true;

        vm.getRecommendations = function() {
            var deferred =$q.defer();
            dataService.getRecommendations(vm.searchResult.itemId)
                .then(function(res){
                    if (res.data.errors || !res.data || res.data.length === 0) {
                       vm.noRecommendationsFound = true;
                    }
                    else {
                        if (res.data && res.data.length > 10) {
                            vm.recommendations = res.data.slice(0,10);
                        } else{
                            vm.recommendations = res.data;
                        }
                        var productIds = vm.recommendations.map(s => s.itemId);
                        dataService.getDetailsForProducts(productIds)
                            .then(function(returnSearchResults){
                                vm.loading = false;
                                vm.detailedSearchResults = returnSearchResults;
                                
                                deferred.resolve(vm.detailedSearchResults)
                            }, function(error){
                                console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                                vm.loading = false;
                                vm.error = true;
                                deferred.reject(error);
                            });
                    }

                }, function(error){
                    vm.loading = false;
                    vm.error = true;
                    console.error('Could not get recommendations: ' + JSON.stringify(error));
                    deferred.reject(error);
                });
            return deferred.promise;
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
            if (html_code){
                var decoded = angular.element('<textarea />').html(html_code).text();
                return $sce.trustAsHtml(decoded);
            }
        }

    }]);