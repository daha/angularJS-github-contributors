/*globals angular */

/* Controllers */
function UserCtrl($scope, githubResource, $location) {
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
        // $location.path('/github/' + $scope.user + "/");
        // $location.replace();
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
UserCtrl.$inject = ['$scope', 'githubResource', '$location'];
