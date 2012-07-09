/*globals angular,githubResponses */

angular.module('ghContribE2E', ['ghContrib', 'ngMockE2E']).
    run(function ($httpBackend) {
        'use strict';
        $httpBackend.whenGET('https://api.github.com/').
            respond(githubResponses.empty);
        $httpBackend.whenGET(/^partials\/[\s]*/).passThrough();
    });
