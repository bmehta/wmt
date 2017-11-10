'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl as vm'
        });
    }])

    // Define the search controller
    .controller('SearchCtrl', ['$q', '$sce', 'dataService', 'cacheService', function ($q, $sce,  dataService, cacheService) {
        var vm = this;
        vm.loading = false;
        vm.searchQuery = cacheService.getSearchTerm();
        vm.detailedSearchResults = cacheService.getSearchResults();
        vm.noResultsFound = false;
        vm.error = false;

        // function to search for products
        vm.searchProducts = function() {
            if (vm.searchQuery.trim() === '') {
                return;
            }
            var deferred =$q.defer();
            vm.detailedSearchResults = [];
            vm.loading = true;
            vm.error = false;
            vm.noResultsFound = false;
          dataService.getSearch(vm.searchQuery) // call dataService to perform search
              .then(function(result){

                  if (result.data.numItems === 0) { // handle case for 0 results
                      vm.loading = false;
                      vm.noResultsFound = true;
                      return;
                  }
                  var searchResults = result.data.items;
                  var productIds = searchResults.map(s => s.itemId);
                  console.log('productIds: '+ productIds);

                  dataService.getDetailsForProducts(productIds) // call dataService to get details for each product
                      .then(function(returnSearchResults){
                          vm.loading = false;
                          vm.detailedSearchResults = returnSearchResults;
                          cacheService.addSearchResults(returnSearchResults);
                          cacheService.addSearchTerm(vm.searchQuery);
                          deferred.resolve(vm.detailedSearchResults)
                      }, function(error){
                          console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                          vm.loading = false;
                          vm.error = true;
                          deferred.reject(error);
                      });
              }, function(error){
                  console.log('Could not perform search: ' + JSON.stringify(error));
                  deferred.reject(error);
              });
            return deferred.promise;
        };

        vm.renderHTML = function(html_code)
        {
            if (html_code) {
                var decoded = angular.element('<textarea />').html(html_code).text();
                return $sce.trustAsHtml(decoded);
            }
        };

    }]);