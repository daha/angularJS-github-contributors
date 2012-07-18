/*globals angular,githubResponses */

angular.module('githubContributorsE2E', ['githubContributors', 'ngMockE2E'])
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

        $httpBackend.whenJSONP(
            /https:\/\/api\.github\.com\/repos\/foo\/repoA\?/
        ).respond(githubResponses.repos_foo_repoA);

        $httpBackend.whenJSONP(
            /https:\/\/api\.github\.com\/repos\/foo\/repoB\?/
        ).respond(githubResponses.repos_foo_repoB);

        $httpBackend.whenJSONP(
            /https:\/\/api\.github\.com\/repos\/foo\/repoA\/contributors\?/
        ).respond(githubResponses.repos_foo_repoA_contributors);

        $httpBackend.whenJSONP(
            /https:\/\/api\.github\.com\/repos\/foo\/repoB\/contributors\?/
        ).respond(githubResponses.repos_foo_repoB_contributors);
    });
