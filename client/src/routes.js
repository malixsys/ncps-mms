/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import 'angular-ui-router';

angular.module('ncps.routes', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/members');

    $stateProvider
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
