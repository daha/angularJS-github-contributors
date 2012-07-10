/*globals describe,beforeEach,browser,it,expect,element,toMatch,input */

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('GitHub Contributors', function () {
    'use strict';

    describe('with real data', function () {

        describe('Search view', function () {
            beforeEach(function () {
                browser().navigateTo('../../app/index.html');
            });

            it('should navigater to / when location hash is empty',
                function () {
                    expect(browser().location().url()).toBe('/');
                });

            it('should redirect invalid location hashed to /', function () {
                browser().navigateTo('#/invalid-hash');
                expect(browser().location().url()).toBe('/');
            });

            it('should have the user model', function () {
                input('user').enter('foo');
            });

            it('should initiate the search box', function () {
                expect(input('user').val()).toBe('angular');
            });
        });
    });

    describe('with mocked data', function () {
        beforeEach(function () {
            browser().navigateTo('../../app/index-e2e.html');
        });

        describe('transitions from search to user-page', function () {

            it('should change to the user-page', function () {
                input('user').enter('foo');
                element(':button').click();
                expect(browser().location().url()).toBe('/github/foo/');
                expect(element('.user-page').count()).toBe(1);
            });
        });

        describe('user-page', function () {
            beforeEach(function () {
                browser().navigateTo('#/github/foo/');
            });


            it('should display github link', function () {
                expect(element('.view-on-github a').attr('href'))
                    .toBe('foo_html_url');
            });

            it('should display user info', function () {
                expect(element('.user-avatar img').attr('src'))
                    .toBe('../test/e2e/foo.png');
                expect(element('.user-avatar img').attr('alt'))
                    .toBe('foo\'s avatar');

                expect(element('.user-login').text()).toMatch(/\bfoo\b/);
                expect(element('.user-name').text()).toMatch(/\(Foo\)/);
            });

            it('should display user stats', function () {
                expect(element('.user-repos').text())
                    .toMatch(/2\s*Public Repos/);
                expect(element('.user-followers').text())
                    .toMatch(/2\s*Followers/);
            });
        });

    });

});
