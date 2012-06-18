/*globals angular */

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        'use strict';
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);
