/*globals angular,githubResponses */

angular.module('ghContribE2E', ['ghContrib', 'ngMockE2E'])
    .run(function ($httpBackend) {
        'use strict';
        $httpBackend.whenGET(/^partials\/[\s]*/).passThrough();
        // users
        $httpBackend.whenJSONP(/https:\/\/api\.github\.com\/users\/foo\?/)
            .respond(githubResponses.users_foo);
        $httpBackend.whenJSONP(/https:\/\/api\.github\.com\/users\/bar\?/)
            .respond(githubResponses.users_bar);

        $httpBackend.whenJSONP(/https:\/\/api\.github\.com\/users\/foo\/repos\?/)
            .respond(githubResponses.users_foo_repos);
        $httpBackend.whenJSONP(/https:\/\/api\.github\.com\/users\/bar\/repos\?/)
            .respond(githubResponses.users_bar_repos);
    });
