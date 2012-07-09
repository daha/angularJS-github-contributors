/*globals describe,beforeEach,browser,it,expect,element,toMatch,input */

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('gh contrib', function () {
    'use strict';

    describe('GitHub Contributors with real data', function () {
        beforeEach(function () {
            browser().navigateTo('../../app/index.html');
        });

        it('should navigater to / when location hash is empty', function () {
            expect(browser().location().url()).toBe("/");
        });

        it('should redirect invalid location hashed to /', function () {
            browser().navigateTo('#/invalid-hash');
            expect(browser().location().url()).toBe("/");
        });

        it('should have the user model', function () {
            input('user').enter('foo');
        });
    });

    describe('GitHub Contributors with mocked data', function () {
        beforeEach(function () {
            browser().navigateTo('../../app/index-e2e.html');
        });
    });

});
