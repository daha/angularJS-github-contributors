/*globals describe,beforeEach,module,expect,inject,it */
/*globals SearchCtrl,UserCtrl,RepoListCtrl,RepoCtrl,ContribListCtrl */

/* jasmine specs for controllers go here */

describe('GitHub Contributors controllers', function () {
    'use strict';
    var testUser = 'foo',
        anotherUser = 'bar',
        fakeData = ['resonse one'],
        otherFakeData = ['another respone'];

    function createControllerAndVerifyRequestAndModel(httpBackend,
        routeParams, controller, scope, buildQuery, Controller,
        user, model, fakeData) {
        var fakeResponse = {'data': fakeData},
            ctrl;

        httpBackend.expectJSONP(buildQuery(user)).
            respond(fakeResponse);
        routeParams.user = user;
        ctrl = controller(Controller, {$scope: scope});
        httpBackend.flush(1);
        expect(scope[model].data).toEqual(fakeData);

        httpBackend.verifyNoOutstandingRequest();
    }

    function buildVerifyRequestAndModel(httpBackend, routeParams, controller,
        scope, buildQuery, Controller) {
        return function (user, model, fakeData) {
            createControllerAndVerifyRequestAndModel(httpBackend,
                routeParams, controller, scope, buildQuery, Controller,
                user, model, fakeData);
        };
    }

    function verifyForms(scope, model, one, other) {
        expect(scope[model]['1']).toEqual(one);
        expect(scope[model].other).toEqual(other);
    }

    describe('SearchCtrl', function () {
        var searchCtrl, scope, location;

        beforeEach(inject(function ($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            location = $location;
            searchCtrl = $controller(SearchCtrl, {$scope: scope});
        }));

        it('should initialize the user', function () {
            expect(scope.user).toEqual('angular');
        });

        it('should update the url on search', function () {
            var user1 = 'foo',
                user2 = 'bar';
            scope.user = user1;
            scope.userSearch();

            expect(location.path()).toEqual('/github/' + user1 + '/');

            scope.user = user2;
            scope.userSearch();
            expect(location.path()).toEqual('/github/' + user2 + '/');
        });
    });

    describe('UserCtrl', function () {
        var scope,
            controller,
            httpBackend,
            routeParams,
            buildQuery,
            userCtrl,
            verifyRequestAndModel;

        beforeEach(module('ghContrib.services'));

        beforeEach(inject(
            function ($rootScope, $controller, $routeParams, $httpBackend) {
                buildQuery = function (user) {
                    return 'https://api.github.com/users/' + user +
                        '?callback=JSON_CALLBACK&per_page=100';
                };
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                controller = $controller;
                routeParams = $routeParams;
                httpBackend.whenJSONP(buildQuery(testUser)).respond({});
                routeParams.user = testUser;
                userCtrl = controller(UserCtrl, {$scope: scope});
                httpBackend.flush(1);
                verifyRequestAndModel = buildVerifyRequestAndModel(httpBackend,
                    routeParams, controller, scope, buildQuery, UserCtrl);
            }
        ));

        it('should define pluralization for Public repo', function () {
            verifyForms(scope, 'publicRepoForms', 'Public repo', 'Public repos');
        });

        it('should define pluralization for Followers', function () {
            verifyForms(scope, 'followerForms', 'Follower', 'Followers');
        });

        it('should request for user data when created and store it in user_info',
            function () {
                verifyRequestAndModel(testUser, 'user_info', fakeData);
            });

        it('should not use hardcoded requests or data in user_info',
            function () {
                verifyRequestAndModel(anotherUser, 'user_info', otherFakeData);
            });
    });

    describe('RepoListCtrl', function () {
        var rootScope,
            scope,
            controller,
            httpBackend,
            routeParams,
            buildQuery,
            repoListCtrl,
            verifyRequestAndModel;

        beforeEach(module('ghContrib.services'));

        beforeEach(inject(
            function ($rootScope, $controller, $routeParams, $httpBackend) {
                buildQuery = function (user) {
                    return 'https://api.github.com/users/' + user + '/repos' +
                        '?callback=JSON_CALLBACK&per_page=100';
                };
                rootScope = $rootScope;
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                controller = $controller;
                routeParams = $routeParams;
                httpBackend.whenJSONP(buildQuery(testUser)).respond({});
                routeParams.user = testUser;
                repoListCtrl = controller(RepoListCtrl, {$scope: scope});
                httpBackend.flush(1);
                verifyRequestAndModel = buildVerifyRequestAndModel(httpBackend,
                    routeParams, controller, scope, buildQuery, RepoListCtrl);
            }
        ));

        it('should define pluralization for Watcher', function () {
            verifyForms(scope, 'watchForms', 'Watcher', 'Watchers');
        });

        it('should define pluralization for Fork', function () {
            verifyForms(scope, 'forkForms', 'Fork', 'Forks');
        });

        it('should set user on initialization from routeParams', function () {
            httpBackend.whenJSONP(buildQuery(anotherUser)).respond({});
            expect(scope.user).toEqual(testUser);

            routeParams.user = anotherUser;
            scope = rootScope.$new();
            repoListCtrl = controller(RepoListCtrl, {$scope: scope});
            httpBackend.flush(1);
            expect(scope.user).toEqual(anotherUser);
        });

        it('should request for user data when created and store it in repos',
            function () {
                verifyRequestAndModel(testUser, 'repos', fakeData);
            });

        it('should not use hardcoded requests or data in repos',
            function () {
                verifyRequestAndModel(anotherUser, 'repos', otherFakeData);
            });
    });

    describe('RepoCtrl', function () {
        var rootScope,
            scope,
            controller,
            httpBackend,
            routeParams,
            buildQuery,
            repoCtrl,
            testRepo = "angular",
            anotherRepo = "baz",
            verifyRequestAndModel;

        beforeEach(module('ghContrib.services'));

        beforeEach(inject(
            function ($rootScope, $controller, $routeParams, $httpBackend) {
                buildQuery = function (user) {
                    return 'https://api.github.com/repos/' +
                        user + '/' + testRepo +
                        '?callback=JSON_CALLBACK&per_page=100';
                };
                rootScope = $rootScope;
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                controller = $controller;
                routeParams = $routeParams;
                httpBackend.whenJSONP(buildQuery(testUser)).respond({});
                routeParams.user = testUser;
                routeParams.repo = testRepo;
                repoCtrl = controller(RepoCtrl, {$scope: scope});
                httpBackend.flush(1);
                verifyRequestAndModel = buildVerifyRequestAndModel(httpBackend,
                    routeParams, controller, scope, buildQuery, RepoCtrl);
            }
        ));

        it('should define pluralization for Watcher', function () {
            verifyForms(scope, 'watchForms', 'Watcher', 'Watchers');
        });

        it('should define pluralization for Fork', function () {
            verifyForms(scope, 'forkForms', 'Fork', 'Forks');
        });

        it('should request for user data when created and store it in repos',
            function () {
                verifyRequestAndModel(testUser, 'repoInfo', fakeData);
            });

        it('should not use hardcoded requests or data in repos',
            function () {
                verifyRequestAndModel(anotherUser, 'repoInfo', otherFakeData);
            });

    });
});
