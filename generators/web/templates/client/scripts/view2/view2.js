'use strict';

angular.module('myApp.view2', ['ngRoute'])
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/view2', {
        templateUrl: '/views/view2.html',
        controller: 'View2Ctrl'
      });
    }
  ])
  .controller('View2Ctrl', ['$scope', function($scope) {

    $scope.header = 'This is the second view';

  }]);
