// Copyright (c) 2012, David Haglund
/*globals angular,SearchCtrl */

// Declare app level module which depends on filters, and services
angular.module('ghContrib', ['ghContrib.filters', 'ghContrib.services', 'ghContrib.directives']).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            templateUrl: 'partials/search.html',
            controller: SearchCtrl
        });
        $routeProvider.when('/github/:user/', {
            templateUrl: 'partials/user-page.html'
        });
        $routeProvider.when('/github/:user/:repo/', {
            templateUrl: 'partials/repo-page.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }]);
