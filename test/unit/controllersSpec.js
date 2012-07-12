/*globals describe,beforeEach,module,expect,inject,it */
/*globals SearchCtrl,UserCtrl,RepoListCtrl,RepoCtrl,ContribListCtrl */

/* jasmine specs for controllers go here */

describe('GitHub Contributors controllers', function () {
    'use strict';
    var rootScope, scope, controller, httpBackend, routeParams, buildQuery,
        ctrl, verifyRequestAndModel,
        testUser = 'foo',
        anotherUser = 'bar',
        testRepo = "angular",
        anotherRepo = "baz",
        fakeData = ['resonse one'],
        otherFakeData = ['another respone'],
        baseUrl = 'https://api.github.com/',
        queryParams = '?callback=JSON_CALLBACK&per_page=100';

    function createController(Controller) {
        ctrl = controller(Controller, {$scope: scope});
        httpBackend.flush(1);
    }

    function createControllerAndVerifyRequestAndModel(query, Controller,
        user, model, data) {
        var fakeResponse = {'data': data};

        httpBackend.expectJSONP(query).respond(fakeResponse);
        routeParams.user = user;
        createController(Controller);
        expect(scope[model].data).toEqual(data);

        httpBackend.verifyNoOutstandingRequest();
    }

    function buildVerifyRequestAndModel(Controller) {
        return function (query, user, model, fakeData) {
            createControllerAndVerifyRequestAndModel(query, Controller,
                user, model, fakeData);
        };
    }

    function verifyForms(scope, model, one, other) {
        expect(scope[model]['1']).toEqual(one);
        expect(scope[model].other).toEqual(other);
    }

    beforeEach(module('ghContrib.services'));
    beforeEach(inject(
        function ($rootScope, $controller, $routeParams, $httpBackend) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            controller = $controller;
            routeParams = $routeParams;
        }
    ));

    describe('SearchCtrl', function () {
        var location;
        beforeEach(inject(function ($location) {
            location = $location;
            ctrl = controller(SearchCtrl, {$scope: scope});
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
        beforeEach(function () {
            buildQuery = function (user) {
                return baseUrl + 'users/' + user + queryParams;
            };
            httpBackend.whenJSONP(buildQuery(testUser)).respond({});
            routeParams.user = testUser;
            createController(UserCtrl);
            verifyRequestAndModel = buildVerifyRequestAndModel(UserCtrl);
        });

        it('should define pluralization for Public repo', function () {
            verifyForms(scope, 'publicRepoForms', 'Public repo',
                'Public repos');
        });

        it('should define pluralization for Followers', function () {
            verifyForms(scope, 'followerForms', 'Follower', 'Followers');
        });

        it('should send request when created and store it in user_info',
            function () {
                verifyRequestAndModel(buildQuery(testUser), testUser,
                    'user_info', fakeData);
            });

        it('should not use hardcoded requests or data in user_info',
            function () {
                verifyRequestAndModel(buildQuery(anotherUser), anotherUser,
                    'user_info', otherFakeData);
            });
    });

    describe('RepoListCtrl', function () {
        beforeEach(function () {
            buildQuery = function (user) {
                return baseUrl + 'users/' + user + '/repos' + queryParams;
            };
            httpBackend.whenJSONP(buildQuery(testUser)).respond({});
            routeParams.user = testUser;
            createController(RepoListCtrl);
            verifyRequestAndModel = buildVerifyRequestAndModel(RepoListCtrl);
        });

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
            createController(RepoListCtrl);
            expect(scope.user).toEqual(anotherUser);
        });

        it('should request for user data when created and store it in repos',
            function () {
                verifyRequestAndModel(buildQuery(testUser), testUser,
                    'repos', fakeData);
            });

        it('should not use hardcoded requests or data in repos',
            function () {
                verifyRequestAndModel(buildQuery(anotherUser), anotherUser,
                    'repos', otherFakeData);
            });
    });

    describe('RepoCtrl', function () {
        beforeEach(function () {
            buildQuery = function (user, repo) {
                return baseUrl + 'repos/' + user + '/' + repo + queryParams;
            };
            httpBackend.whenJSONP(buildQuery(testUser, testRepo)).respond({});
            routeParams.user = testUser;
            routeParams.repo = testRepo;
            createController(RepoCtrl);
            verifyRequestAndModel = buildVerifyRequestAndModel(RepoCtrl);
        });

        it('should define pluralization for Watcher', function () {
            verifyForms(scope, 'watchForms', 'Watcher', 'Watchers');
        });

        it('should define pluralization for Fork', function () {
            verifyForms(scope, 'forkForms', 'Fork', 'Forks');
        });

        it('should request for user data when created and store it in repos',
            function () {
                verifyRequestAndModel(buildQuery(testUser, testRepo), testUser,
                    'repoInfo', fakeData);
            });

        it('should not use hardcoded requests or data in repos',
            function () {
                routeParams.repo = anotherRepo;
                verifyRequestAndModel(buildQuery(anotherUser, anotherRepo),
                    anotherUser, 'repoInfo', otherFakeData);
            });
    });

    describe('ContribListCtrl', function () {
        beforeEach(function () {
            buildQuery = function (user, repo) {
                return baseUrl + 'repos/' + user + '/' + repo +
                    '/contributors' + queryParams;
            };
            httpBackend.whenJSONP(buildQuery(testUser, testRepo)).respond({});
            routeParams.user = testUser;
            routeParams.repo = testRepo;
            createController(ContribListCtrl);
            verifyRequestAndModel = buildVerifyRequestAndModel(ContribListCtrl);
        });

        it('should request for user data when created and store it in repos',
            function () {
                verifyRequestAndModel(buildQuery(testUser, testRepo), testUser,
                    'contributors', fakeData);
            });

        it('should not use hardcoded requests or data in repos',
            function () {
                routeParams.repo = anotherRepo;
                verifyRequestAndModel(buildQuery(anotherUser, anotherRepo),
                    anotherUser, 'contributors', otherFakeData);
            });
    });
});
