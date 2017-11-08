'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.when('/detail/:itemid', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailCtrl as vm'
        });
    }])

    .controller('DetailCtrl', ['$scope', '$q', 'dataService', 'cacheService', '$routeParams', function ($scope, $q, dataService, cacheService, $routeParams) {
        var vm = this;
        alert(JSON.stringify($routeParams));
        var itemId = parseInt($routeParams.itemid);
        console.log('itemid: ' + itemId);

        var searchResult = cacheService.getSearchResult(itemId);
        console.log('searchResult: ' + JSON.stringify(searchResult));
        if (!searchResult){
            dataService.getProductDetail(itemId)
                .then(function(result){
                    searchResult = result.data;
                    console.log('searchResult: ' + JSON.stringify(searchResult));
                }, function(error){
                    console.error('Could not get product detail: ' + JSON.stringify(error));
                });
        }
        console.log('searchResult: ' + JSON.stringify(searchResult));

    }]);