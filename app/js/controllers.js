// Copyright (c) 2012, David Haglund
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//     * Redistributions of source code must retain the above
//       copyright notice, this list of conditions and the following
//       disclaimer.
//
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials
//       provided with the distribution.
//
//     * Neither the name of the copyright holder nor the names of its
//       contributors may be used to endorse or promote products
//       derived from this software without specific prior written
//       permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
// OF THE POSSIBILITY OF SUCH DAMAGE.
/*globals angular */

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
        'other': 'Public repos'
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
