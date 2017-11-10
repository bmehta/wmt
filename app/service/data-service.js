'use strict';

// Service to return data from numbers http server
angular.module('myApp.service')
    .factory('dataService', ['$http', function($http) {

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

        return dataService;
    }]);
