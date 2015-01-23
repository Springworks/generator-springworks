'use strict';

angular.module('myApp.view1', ['ngRoute'])
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/views/view1.html',
        controller: 'View1Ctrl'
      });
    }
  ])
  .controller('View1Ctrl', ['$scope', function($scope) {

    $scope.header = 'You did it! Good Work!';

  }]);
