'use strict';

/**
 * This is the main starting point of the application. In here we
 * bootstrap the whole application.
 */
angular
    .module('myApp', [
      'ngRoute',
      'myApp.version',
      'myApp.view1',
      'myApp.view2'
    ])
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
      }
    ]);
