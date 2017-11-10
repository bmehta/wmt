'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl as vm'
        });
    }])

    .controller('SearchCtrl', ['$q', '$timeout', '$sce', 'dataService', 'cacheService', function ($q, $timeout, $sce,  dataService, cacheService) {
        var vm = this;
        vm.loading = false;
        vm.searchQuery = cacheService.getSearchTerm();
        //vm.searchResults = [];
        vm.detailedSearchResults = cacheService.getSearchResults();
        vm.noResultsFound = false;
        vm.error = false;

        vm.searchProducts = function() {
            vm.detailedSearchResults = [];
            vm.loading = true;
            vm.error = false;
            vm.noResultsFound = false;
          dataService.getSearch(vm.searchQuery)
              .then(function(result){

                  if (result.data.numItems === 0) {
                      vm.loading = false;
                      vm.noResultsFound = true;
                      return;
                  }
                  var searchResults = result.data.items;
                  vm.noResultsFound = searchResults.length === 0;

                  var throttleNeeded = searchResults.length > 5; // Add throttle because walmart apis only allow 5 requests per second
                  var loopSize = throttleNeeded? 5: searchResults.length;

                  var searchResultHttp = [];
                  for (var i=0; i< loopSize; i++) {
                      searchResultHttp.push(dataService.getProductDetail(searchResults[i].itemId));
                  }
                  var retArr = [];
                  $q.all(searchResultHttp).then(function (ret) {
                      for (var i = 0; i< ret.length; i++){
                          retArr.push(ret[i].data);
                      }

                      if (!throttleNeeded) {
                          vm.loading = false;
                          vm.detailedSearchResults = retArr;
                          cacheService.addSearchResults(retArr);
                          cacheService.addSearchTerm(vm.searchQuery);
                      } else {
                          $timeout( function(){
                              var searchResultHttp2 = [];
                              for (var i=5; i< searchResults.length; i++) {
                                  searchResultHttp2.push(dataService.getProductDetail(searchResults[i].itemId));
                              }
                              $q.all(searchResultHttp2).then(function (ret) {
                                  for (var i = 0; i< ret.length; i++){
                                      retArr.push(ret[i].data);
                                  }
                                  vm.loading = false;
                                  vm.detailedSearchResults = retArr;
                                  cacheService.addSearchResults(retArr);
                                  cacheService.addSearchTerm(vm.searchQuery);

                              }, function(error){
                                  console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                                  vm.loading = false;
                                  vm.error = true;
                              });
                          }, 2000 );
                      }

                  }, function(error){
                      console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                      vm.loading = false;
                      vm.error = true;
                  });

              }, function(error){
                  console.log('Could not perform search: ' + JSON.stringify(error));
              })
        };

        vm.renderHTML = function(html_code)
        {
            //return $sce.trustAsHtml(html_code);
            var decoded = angular.element('<textarea />').html(html_code).text();
            return $sce.trustAsHtml(decoded);
        };

    }]);