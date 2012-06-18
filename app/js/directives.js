/*globals angular */

/* Directives */

angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        'use strict';
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);
