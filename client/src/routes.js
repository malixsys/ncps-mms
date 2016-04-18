/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import 'angular-ui-router';

angular.module('ncps.routes', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/members/login');

    $stateProvider
    .state('login', {
        url: '/members/login',
        templateUrl: 'members/members-login.html',
        controller: 'AuthController',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                console.log('Going to /members/...');
                $state.go('members', {
                    // 'headers': {
                    //     'Authorization': 'Bearer ' + auth.getToken()
                    // }
                });
            }
        }]
    })
    .state('register', {
        url: '/members/register',
        templateUrl: 'members/members-register.html',
        controller: 'AuthController',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('members');
            }
        }]
    })
    .state('members', {
        url: '/members',
        templateUrl: 'members/members-view.html',
        resolve: {
            members: function($http, auth) {
                console.log('Trying to get /members....');
                return $http.get('/members', {
                    headers: {
                        'Authorization': 'Bearer ' + auth.getToken()
                    }
                }).then(function(response){
                    return response.data;
                });
            }
        },
        controller: 'MembersController as membersCtrl'
    })
    .state('new', {
        url: '/members/add',
        templateUrl: '/members/members-add.html',
        controller: 'MembersSaveController as newMemberCtrl'
    })
    .state('test', {
        url: '/members/test',
        template: 'This is a test.'
    });
});
