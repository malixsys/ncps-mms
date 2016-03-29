/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
angular.module('ncps.controllers', [])
.controller('MembersController', function($http) {
    $http.get('/members').then((response) => {
        this.members = response.data;
    });
})

.controller('MembersSaveController', function($stateParams, $state, $http) {
    this.member = $state.member;

    this.saveMember = function(member) {
        $http.post('/members', member).then((res, member) => {
            console.log(member);
            $state.go('members');
        });
    };
});
