import angular from 'angular';

angular.module('my.app2',[]).controller('GreetingController', ['$scope', function($scope) {
  console.log('2');
}]);