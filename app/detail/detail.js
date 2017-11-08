'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider',  function ($routeProvider) {
        $routeProvider.when('/detail/:itemid', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailCtrl as vm'
        });
    }])

    .controller('DetailCtrl', ['$scope', '$q', 'dataService', '$routeParams', function ($scope, $q, dataService, $routeParams) {
        var vm = this;
        alert(JSON.stringify($routeParams));
        var itemId = $routeParams.itemid;
        console.log('itemid: ' + itemId);

    }]);