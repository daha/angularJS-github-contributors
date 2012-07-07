/*globals describe,beforeEach,module,expect,inject,it,SearchCtrl,UserCtrl */

/* jasmine specs for controllers go here */

describe('GitHub Contributors controllers', function () {
    'use strict';
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

    // describe('UserCtrl', function () {
    //     var userCtrl;

    //     beforeEach(module('ghContrib.services'));

    //     beforeEach(function () {
    //         userCtrl = new UserCtrl();
    //     });


    //     it('should ....', function () {
    //         //spec body
    //     });
    // });
})
