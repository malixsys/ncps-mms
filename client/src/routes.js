/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import 'angular-ui-router';

angular.module('ncps.routes', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/members');

    $stateProvider
    .state('login', {
        url: '/members/login',
        templateUrl: 'members/members-login.html',
        controller: 'AuthController',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('members');
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
            membersService: function($http) {
                return $http.get('/members');
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
