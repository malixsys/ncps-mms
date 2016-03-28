/* jshint esversion: 6 */
/* jshint node: true */
import angular from 'angular';
import './controllers/controllers';
import './routes';

angular.module('ncps', ["ncps.routes", "ncps.controllers"]);
