// Copyright (c) 2012, David Haglund
/*globals angular */

/* Controllers */
function SearchCtrl($scope, $location) {
    'use strict';
    $scope.user = "angular";

    $scope.userSearch = function () {
        $location.path('/github/' + $scope.user + "/");
    };

}
SearchCtrl.$inject = ['$scope', '$location'];

function UserCtrl($scope, $location, $routeParams, githubResource) {
    'use strict';
    $scope.user_info = githubResource.get({user: $routeParams.user, repo: ''});
    $scope.repos = githubResource.get({user: $routeParams.user});
    $scope.user = $routeParams.user;

    $scope.repoSearch = function (repo) {
        $location.path(['', 'github', $scope.user, repo, '' ].join('/'));
    };
}
UserCtrl.$inject = ['$scope', '$location', '$routeParams', 'githubResource'];

function RepoCtrl($scope, $location, $routeParams, githubResource) {
    'use strict';
    $scope.contributors = githubResource.get({
        "query": "repos",
        "user": $routeParams.user,
        "repo": $routeParams.repo,
        "spec": "contributors"
    });
}
RepoCtrl.$inject = ['$scope', '$location', '$routeParams', 'githubResource'];
