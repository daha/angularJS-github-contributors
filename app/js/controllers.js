/*globals angular */

/* Controllers */
function SearchCtrl() {
    'use strict';
}
SearchCtrl.$inject = [];

function UserCtrl($scope, githubResource, $location) {
    'use strict';
    $scope.repos = [];
    $scope.selectedRepo = "";
    $scope.search = "";
    $scope.repoInfo = "";
    $scope.contributors = [];

    $scope.userSearch = function () {
        $scope.repos = githubResource.get({user: $scope.searchTerm});
        // $location.path('/github/' + $scope.searchTerm + "/");
        // $location.replace();
        $scope.selectedRepo = "";
        $scope.search = $scope.searchTerm;
        $scope.repoInfo = "";
        $scope.contributors = [];
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


    };
}
UserCtrl.$inject = ['$scope', 'githubResource', '$location'];

function RepoCtrl($scope) {
    'use strict';
    $scope.repo = "repoCtrl";
}
RepoCtrl.$inject = ['$scope'];
