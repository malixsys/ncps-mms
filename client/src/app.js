/* jshint esversion: 6 */
import angular from 'angular';
angular.module('ncps', [])

.controller('membersController', function($http) {
    $http.get('/members').then((response) => {
        this.members = response.data;
    });
});
