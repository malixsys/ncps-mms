/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import './controllers/controllers';
import './routes';

angular.module('ncps', ["ncps.routes", "ncps.controllers"])
.factory('AuthInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
})
.factory('auth', ['$http', '$window', function($http, $window) {
    var auth = {};

    auth.saveToken = function(token) {
        //console.log('token is: ' + token);
        $window.localStorage['ncps-token'] = token;
        console.log('inside auth.saveToken and token is: ' + $window.localStorage['ncps-token']);
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
            console.log('inside auth factory, token is: ' + data.token);
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function() {
        $window.localStorage.removeItem('ncps-token');
    };

    return auth;
}]);
