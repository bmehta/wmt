'use strict';

// Service to return data from numbers http server
angular.module('myApp.service')
    .factory('dataService', ['$http', '$q', '$timeout', function($http, $q, $timeout) {

        var urlBase = 'http://api.walmartlabs.com/v1';
        var apiKey = 'd9nr24chkrrd9p4sgck8v5ub';
        var dataService = {};
        var jsonp = 'callback=JSON_CALLBACK';

        dataService.getSearch = function(query) {
            //Use jsonp to get around CORS issue
            return $http.jsonp(urlBase + '/search?apiKey=' + apiKey + '&query=' + query + '&' + jsonp) //Use jsonp to get around CORS issue
        };

        dataService.getProductDetail = function(productId) {
            //Use jsonp to get around CORS issue
            return $http.jsonp(urlBase + '/items/' + productId + '?apiKey=' + apiKey + '&' + jsonp);
        };

        dataService.getRecommendations = function(productId){
            //return $http.jsonp(urlBase + '/nbp?apiKey=' + apiKey + '&itemId=' + productId + '&' + jsonp);

            //Since jsonp is not correctly implemented on the server side for this api call, we will need to use something like the Chrome extension "Access-Control-Allow-Origin".
            return $http.get(urlBase + '/nbp?apiKey=' + apiKey + '&itemId=' + productId);
        };
        
        dataService.getDetailsForProducts = function(productIds) {
            var deferred = $q.defer();
            var throttleNeeded = productIds.length > 5; // Add throttle because walmart apis only allow 5 requests per second
            var loopSize = throttleNeeded? 5: productIds.length;

            var searchResultHttp = [];
            for (var i=0; i< loopSize; i++) {
                searchResultHttp.push(dataService.getProductDetail(productIds[i]));
            }
            var retArr = [];
            $q.all(searchResultHttp).then(function (ret) {
                for (var i = 0; i< ret.length; i++){
                    retArr.push(ret[i].data);
                }

                if (!throttleNeeded) {
                    deferred.resolve(retArr);
                } else {
                    $timeout( function(){
                        var searchResultHttp2 = [];
                        for (var i=5; i< productIds.length; i++) {
                            searchResultHttp2.push(dataService.getProductDetail(productIds[i]));
                        }
                        $q.all(searchResultHttp2).then(function (ret) {
                            for (var i = 0; i< ret.length; i++){
                                retArr.push(ret[i].data);
                            }
                            deferred.resolve(retArr);

                        }, function(error){
                            console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                            deferred.reject(error);
                        });
                    }, 2000 );
                }

            }, function(error){
                console.log('Could not fetch detailed search results: ' + JSON.stringify(error));
                deferred.reject(error);
            });

            return deferred.promise;

        };

        return dataService;
    }]);
