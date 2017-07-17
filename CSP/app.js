'use strict';

var servicesModule = angular.module('servicesModule', []);
var controllersModule = angular.module('controllersModule', []);
var directivesModule = angular.module('directivesModule', []);
var mainModule = angular.module('mainModule', ['servicesModule', 'controllersModule', 'directivesModule', 'ngRoute', 'ngCookies']);

mainModule.config(function ($routeProvider, $httpProvider) {
  $httpProvider.useApplyAsync(true);

  $routeProvider.when('/', {
    templateUrl: 'pages/main/main.html',
    controller: 'mainController'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });
});