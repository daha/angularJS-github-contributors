// Copyright (c) 2012, David Haglund
/*globals angular */

/* Controllers */

var watchForms = {
        '1': 'Watcher',
        'other': 'Watchers'
    },
    forkForms = {
        '1': 'Fork',
        'other': 'Forks'
    };

function SearchCtrl($scope, $location) {
    'use strict';

    $scope.user = "angular";

    $scope.userSearch = function () {
        $location.path(['', 'github', $scope.user, ''].join('/'));
    };
}
SearchCtrl.$inject = ['$scope', '$location'];

function RepoListCtrl($scope, $routeParams, githubResource) {
    'use strict';

    $scope.repos = githubResource.get({user: $routeParams.user});
    $scope.user = $routeParams.user;

    $scope.watchForms = watchForms;
    $scope.forkForms = forkForms;
}
RepoListCtrl.$inject = ['$scope', '$routeParams', 'githubResource'];

function UserCtrl($scope, $routeParams, githubResource) {
    'use strict';

    $scope.user_info = githubResource.get({user: $routeParams.user, repo: ''});

    $scope.publicRepoForms = {
        '1': 'Public repo',
        'other': 'Public repo'
    };
    $scope.followerForms = {
        '1': 'Follower',
        'other': 'Followers'
    };
}
UserCtrl.$inject = ['$scope', '$routeParams', 'githubResource'];

function RepoCtrl($scope, $routeParams, githubResource) {
    'use strict';

    $scope.repoInfo = githubResource.get({
        "query": "repos",
        "user": $routeParams.user,
        "repo": $routeParams.repo
    });

    $scope.watchForms = watchForms;
    $scope.forkForms = forkForms;
}
RepoCtrl.$inject = ['$scope', '$routeParams', 'githubResource'];

function ContribListCtrl($scope, $routeParams, githubResource) {
    'use strict';

    $scope.contributors = githubResource.get({
        "query": "repos",
        "user": $routeParams.user,
        "repo": $routeParams.repo,
        "spec": "contributors"
    });
}
ContribListCtrl.$inject = ['$scope', '$routeParams', 'githubResource'];
