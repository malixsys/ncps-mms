/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
angular.module('ncps.controllers', [])

.controller('MembersController', ['$http', 'auth', function($http, auth) {
    console.log('Sending get request to /members...');
    $http.get('/members', {
        headers: {
            'Authorization': 'Bearer ' + auth.getToken()
        }
    }).then((res) => {
        this.members = res.data;
    });
}])

.controller('MembersSaveController', function($stateParams, $state, $http) {
    this.member = $state.member;

    this.saveMember = function(member) {
        $http.post('/members', member).then((res, member) => {
            $state.go('members');
        });
    };
})

.controller('NavController', ['$scope', 'auth', function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
}])

.controller('AuthController', ['$scope', '$state', 'auth', function($scope, $state, auth) {
    $scope.user = {};

    $scope.register = function() {
        auth.register($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('members');
        });
    };

    $scope.logIn = function() {
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('members');
        });
    };

    $scope.logOut = function() {
        auth.logOut().error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('members');
        });
    };
}]);
