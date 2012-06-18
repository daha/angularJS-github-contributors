/*globals angular */

/* Services */

angular.module('ghContrib.services', ['ngResource'], function ($provide) {
    'use strict';
    $provide.factory('githubResource', function ($resource) {
        return $resource('https://api.github.com/users/:user/repos',
            {user: 'angular', callback: 'JSON_CALLBACK', per_page: 100},
            {get: {method: 'JSONP'}});
    });
    //     return $resource('https://api.github.com/users/:user',
    //         {user: 'angular', callback: 'JSON_CALLBACK'},
    //         {get: {method: 'JSONP'}});
    // });
});
