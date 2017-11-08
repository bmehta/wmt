'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl as vm'
        });
    }])

    .controller('SearchCtrl', ['$scope', '$http', '$q', '$timeout', 'dataService', function ($scope, $http, $q, $timeout, dataService) {
        var vm = this;
        vm.loading = false;
        vm.searchQuery = '';
        //vm.searchResults = [];
        vm.detailedSearchResults = [];

        vm.searchProducts = function() {
          dataService.getSearch(vm.searchQuery)
              .then(function(result){
                  var searchResults = result.data.items;

                  var throttleNeeded = searchResults.length > 5;
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
                          vm.detailedSearchResults = retArr;
                      }

                  }, function(error){
                      console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                  });

                  if (throttleNeeded) {
                      $timeout( function(){
                          var searchResultHttp2 = [];
                          for (var i=5; i< searchResults.length; i++) {
                              searchResultHttp2.push(dataService.getProductDetail(searchResults[i].itemId));
                          }
                          $q.all(searchResultHttp2).then(function (ret) {
                              for (var i = 0; i< ret.length; i++){
                                  retArr.push(ret[i].data);
                              }
                              vm.detailedSearchResults = retArr;

                          }, function(error){
                              console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                          });
                      }, 1000 );
                  }
              }, function(error){
                  console.log('Could not perform search: ' + JSON.stringify(error));
              })
        };

    }]);