/*globals githubResponses */

var githubResponses = githubResponses || {};

githubResponses.empty = {data: []};

githubResponses.users_foo = {data: {
    'login': 'foo',
    'name': 'Foo',
    'html_url': 'foo_html_url',
    'avatar_url': '../test/e2e/foo.png',
    'public_repos': 2,
    'followers': 2
}};

githubResponses.users_bar = {data: {
    'login': 'bar',
    'name': '',
    'html_url': 'bar_html_url',
    'avatar_url': '../test/e2e/bar.png',
    'public_repos': 1,
    'followers': 1
}};

githubResponses.users_foo_repos = {data: []};
githubResponses.users_bar_repos = {data: []};
