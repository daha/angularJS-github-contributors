/*globals describe,beforeEach,browser,it,expect,element,toMatch,input */
/*globals repeater */

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

                it('should transition form user page to repoC page',
                    function () {
                        element('li:nth-child(3) a').click();
                        expect(browser().location().url())
                            .toBe('/github/foo/repoA/');
                        expect(element('.repo-page').count()).toBe(1);
                    });

                it('should display github link', function () {
                    expect(element('.view-on-github a').attr('href'))
                        .toBe('foo_html_url');
                });

                it('should display user info', function () {
                    var userImgElement = element('.user-avatar img');
                    expect(userImgElement.attr('src'))
                        .toBe('../test/e2e/foo.png');
                    expect(userImgElement.attr('alt'))
                        .toBe('foo\'s avatar');

                    expect(element('.user-login').text()).toMatch(/\bfoo\b/);
                    expect(element('.user-name').text()).toMatch(/\(Foo\)/);
                });

                it('should display user stats', function () {
                    expect(element('.user-repos').text())
                        .toMatch(/\b2\s*Public repos\b/);
                    expect(element('.user-followers').text())
                        .toMatch(/\b2\s*Followers\b/);
                });

                it('should show all user repos in correct order', function () {
                    var repoNameLink = repeater('.repo-name a');
                    expect(repeater('.repo').count()).toBe(3);
                    expect(repoNameLink.row(0)).toEqual(['repoC']);
                    expect(repoNameLink.row(1)).toEqual(['repoB']);
                    expect(repoNameLink.row(2)).toEqual(['repoA']);

                    expect(element('li:nth-child(1) a').attr('href'))
                        .toBe('#/github/foo/repoC/');
                    expect(element('li:nth-child(2) a').attr('href'))
                        .toBe('#/github/foo/repoB/');
                    expect(element('li:nth-child(3) a').attr('href'))
                        .toBe('#/github/foo/repoA/');
                });

                it('should show description if available', function () {
                    var repoDesc = repeater('.repo-desc');
                    expect(repoDesc.row(0)).toEqual(['']);
                    expect(repoDesc.row(2)).toEqual(['aa']);
                });

                it('should show language if available', function () {
                    var repoLang = repeater('.repo-lang');
                    expect(repoLang.row(0)).toEqual(['']);
                    expect(repoLang.row(2)).toEqual(['JavaScript']);
                });

                it('should show watchers and forks', function () {
                    var repoWatchers = repeater('.repo-watchers'),
                        repoForks = repeater('.repo-forks');
                    expect(repoWatchers.row(0)).toEqual(['2']);
                    expect(repoWatchers.row(1)).toEqual(['1']);
                    expect(repoWatchers.row(2)).toEqual(['0']);

                    expect(element('li:nth-child(1) .repo-watchers').text())
                        .toMatch(/\bWatchers\b/);
                    expect(element('li:nth-child(2) .repo-watchers').text())
                        .toMatch(/\bWatcher\b/);
                    expect(element('li:nth-child(3) .repo-watchers').text())
                        .toMatch(/\bWatchers\b/);

                    expect(repoForks.row(0)).toEqual(['0']);
                    expect(repoForks.row(1)).toEqual(['2']);
                    expect(repoForks.row(2)).toEqual(['1']);

                    expect(element('li:nth-child(1) .repo-forks').text())
                        .toMatch(/\bForks\b/);
                    expect(element('li:nth-child(2) .repo-forks').text())
                        .toMatch(/\bForks\b/);
                    expect(element('li:nth-child(3) .repo-forks').text())
                        .toMatch(/\bFork\b/);
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
                    .toMatch(/\b1\s*Public repo\b/);
                expect(element('.user-followers').text())
                    .toMatch(/\b1\s*Follower\b/);
            });
        });

        describe('repo page (foo/repoA)', function () {
            beforeEach(function () {
                browser().navigateTo('#/github/foo/repoA/');
            });

            it('should transition back to the user page (foo)', function () {
                element('.back a').click();
                expect(browser().location().url()).toBe('/github/foo/');
            });

            it('should display repo info', function () {
                expect(element('.back a').attr('href')).toBe('#/github/foo/');
                expect(element('.view-on-github a').attr('href'))
                    .toBe('repoA_url');
                expect(element('.avatar img').attr('src'))
                    .toBe('../test/e2e/foo.png');
                expect(element('.avatar img').attr('alt'))
                    .toBe('foo\'s avatar');
                expect(element('.user-login').text()).toBe('foo');
                expect(element('.repo-name').text()).toBe('repoA');

                expect(element('.repo-watchers').text())
                    .toMatch(/0\s*Watchers\b/);
                expect(element('.repo-forks').text()).toMatch(/1\s*Fork\b/);
            });

            it('should display number of Contributors', function () {
                expect(element('h2').text()).toBe('Project Contributors (2)');
                expect(repeater('.contributor').count()).toBe(2);
            });

            it('should display contributors (first contributor)', function () {
                expect(repeater('.contributor .contributor-name').row(0))
                    .toEqual(['foo']);
                expect(repeater('.contributor .contributor-contributions')
                    .row(0)).toEqual(['10']);

                expect(element('li:nth-child(1) a').attr('title'))
                        .toBe('foo has 10 Contributions');

                expect(element('li:nth-child(1) img').attr('alt'))
                    .toBe('foo\'s avatar');

                expect(element('li:nth-child(1) img').attr('src'))
                    .toBe('../test/e2e/foo.png');
            });

            it('should display contributors (second contributor)', function () {
                expect(repeater('.contributor .contributor-name').row(1))
                    .toEqual(['bar']);
                expect(repeater('.contributor .contributor-contributions')
                    .row(1)).toEqual(['1']);

                // TODO: It should be '1 Contribution'
                expect(element('li:nth-child(2) a').attr('title'))
                    .toBe('bar has 1 Contributions');

                expect(element('li:nth-child(2) img').attr('alt'))
                    .toBe('bar\'s avatar');

                expect(element('li:nth-child(2) img').attr('src'))
                    .toBe('');
            });

            it('should transition to contributor on click (foo)', function () {
                element('li:nth-child(1) a').click();
                expect(browser().location().url()).toBe('/github/foo/');
            });

            it('should transition to contributor on click (bar)', function () {
                element('li:nth-child(2) a').click();
                expect(browser().location().url()).toBe('/github/bar/');
            });
        });

        describe('repo page (foo/repoB)', function () {
            beforeEach(function () {
                browser().navigateTo('#/github/foo/repoB/');
            });

            it('should display repo info', function () {
                expect(element('.repo-watchers').text())
                    .toMatch(/1\s*Watcher\b/);
                expect(element('.repo-forks').text()).toMatch(/2\s*Forks\b/);
            });

            it('should display number of Contributors', function () {
                expect(element('h2').text()).toBe('Project Contributors (0)');
                expect(repeater('.contributor').count()).toBe(0);
            });
        });
    });
});
