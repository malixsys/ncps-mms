/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
angular.module('ncps.controllers', [])
.controller('MembersController', function($http) {
    $http.get('/members').then((response) => {
        this.members = response.data;
    });
});
