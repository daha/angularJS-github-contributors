/*globals angular,MyCtrl1,MyCtrl2 */

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
