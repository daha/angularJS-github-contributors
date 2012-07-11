/*globals describe,beforeEach,browser,it,expect,element,toMatch,input */

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('GitHub Contributors with real data', function () {
    'use strict';
    describe('Search view', function () {
        beforeEach(function () {
            browser().navigateTo('../../app/index.html');
        });

        it('should navigater to / when location hash is empty', function () {
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

describe('GitHub Contributors with mocked data', function () {
    'use strict';
    beforeEach(function () {
        browser().navigateTo('../../app/index-e2e.html');
    });

    describe('Search view', function () {
        it('should transition from search page to the user page',
            function () {
                input('user').enter('foo');
                element(':button').click();
                expect(browser().location().url()).toBe('/github/foo/');
                expect(element('.user-page').count()).toBe(1);
            });
    });

    describe('user-page', function () {
        describe('user foo (with name name multiple followers and repos',
            function () {
                beforeEach(function () {
                    browser().navigateTo('#/github/foo/');
                });

                it('should transition from user page to search page',
                    function () {
                        element('.back a').click();
                        expect(browser().location().url()).toBe('/');
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
                        .toMatch(/\b2\s*Public Repos\b/);
                    expect(element('.user-followers').text())
                        .toMatch(/\b2\s*Followers\b/);
                });
            });

        describe('user bar (no name, and 1 repo and 1 follower)', function () {
            beforeEach(function () {
                browser().navigateTo('#/github/bar/');
            });

            it('should display user info but no name', function () {
                expect(element('.user-login').text()).toMatch(/\bbar\b/);
                expect(element('.user-name').attr('style'))
                    .toMatch('display: none;');
            });

            it('should display user stats', function () {
                expect(element('.user-repos').text())
                    .toMatch(/\b1\s*Public Repo\b/);
                expect(element('.user-followers').text())
                    .toMatch(/\b1\s*Follower\b/);
            });
        });
    });
});
