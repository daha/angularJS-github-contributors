/*globals angular,UserCtrl */

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';
        // $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
