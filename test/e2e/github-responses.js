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
    'html_url': '',
    'avatar_url': '',
    'public_repos': 1,
    'followers': 1
}};

githubResponses.users_foo_repos = {data: [
    {
        'name': 'repoA',
        'description': 'aa',
        'language': 'JavaScript',
        'watchers': 0,
        'forks': 1,
        'full_name': 'foo/repoA',
        'owner': {'login': 'foo'}
    },
    {
        'name': 'repoB',
        'description': '',
        'language': null,
        'watchers': 1,
        'forks': 2,
        'full_name': 'foo/repoB',
        'owner': {'login': 'foo'}
    },
    {
        'name': 'repoC',
        'description': '',
        'language': null,
        'watchers': 2,
        'forks': 0,
        'full_name': 'foo/repoC',
        'owner': {'login': 'foo'}
    }
]};
githubResponses.users_bar_repos = {data: []};

githubResponses.repos_foo_repoA = {data: {
    'owner': {
        'login': 'foo',
        'avatar_url': '../test/e2e/foo.png'
    },
    'html_url': 'repoA_url',
    'name': 'repoA',
    'watchers': 0,
    'forks': 1
}};

githubResponses.repos_foo_repoA_contributors = {data: []};

githubResponses.repos_foo_repoB = {data: {
    'owner': {
        'login': 'foo',
        'avatar_url': '../test/e2e/foo.png'
    },
    'html_url': '',
    'name': 'repoB',
    'watchers': 1,
    'forks': 2
}};

githubResponses.repos_foo_repoB_contributors = {data: []};
