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

    $scope.userSearch = function () {
        $scope.repos = githubResource.get({user: $scope.searchTerm});
        // $location.path('/github/' + $scope.searchTerm + "/");
        // $location.replace();
        $scope.selectedRepo = "";
        $scope.search = $scope.searchTerm;
    };

    $scope.repoSearch = function (repo) {
        $scope.selectedRepo = repo;
    };
}
UserCtrl.$inject = ['$scope', 'githubResource', '$location'];

function RepoCtrl($scope) {
    'use strict';
    $scope.repo = "repoCtrl";
}
RepoCtrl.$inject = ['$scope'];
