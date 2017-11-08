'use strict';

// Service to return data from numbers http server
angular.module('myApp.service',[])
    .factory('dataService', ['$http', function($http) {

        var urlBase = 'http://api.walmartlabs.com/v1';
        var apiKey = 'd9nr24chkrrd9p4sgck8v5ub';
        var dataService = {};
        var jsonp = 'callback=JSON_CALLBACK';

        dataService.getSearch = function(query) {
            return $http.jsonp(urlBase + '/search?apiKey=' + apiKey + '&query=' + query + '&' + jsonp)
        };

        dataService.getProductDetail = function(productId) {
            return $http.jsonp(urlBase + '/items/' + productId + '?apiKey=' + apiKey + '&' + jsonp);
        };

        dataService.getRecommendations = function(productId){
            return $http.jsonp(urlBase + '/nbp?apiKey=' + apiKey + '&itemId=' + productId + '&' + jsonp);
        };

        return dataService;
    }]);
