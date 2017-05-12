import angular from 'angular';
import './test';

angular.module('my.app',[])
.controller('GreetingController', ['$scope', function($scope) {
  console.log('working');
}]);