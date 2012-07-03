/*globals angular */

/* Controllers */
function MainCtrl($scope, githubResource, $location) {
    'use strict';
    $scope.repos = [];
    $scope.selectedRepo = "";
    $scope.search = "";
    $scope.repoInfo = "";
    $scope.contributors = [];
    $scope.contribVisibility = "hide";
    $scope.repoVisibility = "hide";

    $scope.userSearch = function () {
        $scope.repos = githubResource.get({user: $scope.user});
        $scope.selectedRepo = "";
        $scope.search = $scope.user;
        $scope.repoInfo = "";
        $scope.contributors = [];
        $scope.repoVisibility = "";
    };

    $scope.repoSearch = function (repo) {
        $scope.repos = [];
        $scope.selectedRepo = repo;
        $scope.repoInfo = githubResource.get({
            "query": "repos",
            "user": $scope.search,
            "repo": repo
        });
        $scope.contributors = githubResource.get({
            "query": "repos",
            "user": $scope.search,
            "repo": repo,
            "spec": "contributors"
        });
        $scope.contribVisibility = "";
        $scope.repoVisibility = "hide";
    };
}
MainCtrl.$inject = ['$scope', 'githubResource', '$location'];

function SearchCtrl($scope, $location) {
    'use strict';
    $scope.userSearch = function () {
        $location.path('/github/' + $scope.user + "/");
    };
}
SearchCtrl.$inject = ['$scope', '$location'];

function UserCtrl($scope, $location, $routeParams, githubResource) {
    'use strict';
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
