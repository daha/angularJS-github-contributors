/*globals describe,beforeEach,module,expect,inject,it */
/*globals SearchCtrl,UserCtrl,RepoListCtrl */

/* jasmine specs for controllers go here */

describe('GitHub Contributors controllers', function () {
    'use strict';
    var testUser = 'foo',
        anotherUser = 'bar';

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
            buildQuery;

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
            }
        ));

        it('should define pluralization for Public repo', function () {
            var userCtrl = controller(UserCtrl, {$scope: scope});
            httpBackend.flush(1);
            expect(scope.publicRepoForms['1']).toEqual('Public repo');
            expect(scope.publicRepoForms.other).toEqual('Public repos');
        });

        it('should define pluralization for Followers', function () {
            var userCtrl = controller(UserCtrl, {$scope: scope});
            httpBackend.flush(1);
            expect(scope.followerForms['1']).toEqual('Follower');
            expect(scope.followerForms.other).toEqual('Followers');
        });

        it('should request for user data when created and store it in user_info',
            function () {
                var userCtrl,
                    fakeData = ['response one'],
                    fakeResponse = {'data': fakeData},
                    user = 'foo';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                userCtrl = controller(UserCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.user_info.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });

        it('should not use hardcoded requests or data in user_info',
            function () {
                var userCtrl,
                    fakeData = ['another response'],
                    fakeResponse = {'data': fakeData},
                    user = 'bar';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                userCtrl = controller(UserCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.user_info.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });
    });

    describe('RepoListCtrl', function () {
        var rootScope,
            scope,
            controller,
            httpBackend,
            routeParams,
            buildQuery,
            repoListCtrl;

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
            }
        ));

        it('should define pluralization for Watcher', function () {
            expect(scope.watchForms['1']).toEqual('Watcher');
            expect(scope.watchForms.other).toEqual('Watchers');
        });

        it('should define pluralization for Fork', function () {
            expect(scope.forkForms['1']).toEqual('Fork');
            expect(scope.forkForms.other).toEqual('Forks');
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
                var fakeData = ['response one'],
                    fakeResponse = {'data': fakeData},
                    user = 'bar';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                repoListCtrl = controller(RepoListCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.repos.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });

        // TODO: Remove duplication!
        it('should not use hardcoded requests or data in repos',
            function () {
                var fakeData = ['another response'],
                    fakeResponse = {'data': fakeData},
                    user = 'baz';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                repoListCtrl = controller(RepoListCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.repos.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });
    });
});
