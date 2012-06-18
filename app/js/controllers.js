/*globals angular */
'use strict';

/* Controllers */
function SearchCtrl() {}
SearchCtrl.$inject = [];

function UserCtrl($scope, githubResource) {
    $scope.doSearch = function () {
        $scope.repos = githubResource.get({user: $scope.searchTerm});
    };
}
UserCtrl.$inject = ['$scope', 'githubResource'];

function RepoCtrl() {}
RepoCtrl.$inject = [];
