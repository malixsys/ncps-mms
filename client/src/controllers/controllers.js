/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
angular.module('ncps.controllers', [])
.factory('auth', ['$http', '$window', function($http, $window) {
    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['ncps-token'] = token;
    };

    auth.getToken = function() {
        return $window.localStorage['ncps-token'];
    };

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user) {
        return $http.post('/members/setup', user).success((data)=> {
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function(user) {
        return $http.post('/members/auth', user).success((data) => {
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function() {
        $window.localStorage.removeItem('ncps-token');
    };

    return auth;
}])

.controller('MembersController', ['$http', 'auth', function($http, auth) {
    $http.get('/members', {
        headers: { Authorization: 'Bearer ' + auth.getToken() }
    }).then((response) => {
        this.members = response.data;
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
