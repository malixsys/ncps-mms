/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import 'angular-ui-router';

angular.module('ncps.routes', ['ui.router']).config(($stateProvider, $urlRouterProvider) => {
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
    .state('members.new', {
        url: '/new',
        template: 'I could use a drink right now.'
    })
    .state('members.test', {
        url: '/test',
        template: 'I could use a drink right now.'
    })
    ;
});
