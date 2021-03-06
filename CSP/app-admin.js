'use strict';

var servicesModule = angular.module('servicesModule', []);
var controllersModule = angular.module('controllersModule', []);
var directivesModule = angular.module('directivesModule', []);
var adminModule = angular.module('adminModule', ['controllersModule', 'servicesModule', 'directivesModule', 'ngRoute', 'ui.bootstrap', 'ngCookies']);

adminModule.config(function ($routeProvider, $httpProvider) {
  $httpProvider.useApplyAsync(true);

  $routeProvider.when('/', {
	templateUrl: 'pages/admin/adminMain.csp',
	controller: 'adminController'	  
  })
  .when('/categories', {
	templateUrl: 'pages/admin/categories.csp',
	controller: 'CategoriesController',
	controllerAs: 'vm'	  
  })
  .when('/categories/edit', {
	  templateUrl: 'pages/admin/editCategory.csp',
	  controller: 'EditCatController',
	  controllerAs: 'vm'
  })
  .when('/categories/edit/:id', {
	  templateUrl: 'pages/admin/editCategory.csp',
	  controller: 'EditCatController',
	  controllerAs: 'vm'
  })
	.when('/area/edit/:id', {
	  templateUrl: 'pages/admin/editArea.csp',
	  controller: 'EditAreaController',
	  controllerAs: 'vm'
  })
  .when('/area/edit', {
	  templateUrl: 'pages/admin/editArea.csp',
	  controller: 'EditAreaController',
	  controllerAs: 'vm'
  })
  .when('/area', {
	  templateUrl: 'pages/admin/area.csp',
	  controller: 'AreaController',
	  controllerAs: 'vm'
  })
  .when('/responsible/edit/:id', {
	  templateUrl: 'pages/admin/editResponsible.csp',
	  controller: 'EditResponsibleController',
	  controllerAs: 'vm'
  })
  .when('/responsible/edit', {
	  templateUrl: 'pages/admin/editResponsible.csp',
	  controller: 'EditResponsibleController',
	  controllerAs: 'vm'
  })
  .when('/responsible', {
	  templateUrl: 'pages/admin/responsible.csp',
	  controller: 'ResponsibleController',
	  controllerAs: 'vm'
  })
  .when('/act', {
	  templateUrl: 'pages/admin/act.csp',
	  controller: 'ActController',
	  controllerAs: 'vm'
  })
  ;

  $routeProvider.otherwise({
    redirectTo: '/'
  });
});
adminModule.controller('adminController', function ($scope, $http, $location) {
		var vm = this;
	
		// Get the Sidebar
		var mySidebar = document.getElementById("mySidebar");

		// Get the DIV with overlay effect
		var overlayBg = document.getElementById("myOverlay");
		vm.w3_open = w3_open;
		vm.w3_close = w3_close; 
		// Toggle between showing and hiding the sidebar, and add overlay effect
		function w3_open() {
		    if (mySidebar.style.display === 'block') {
		        mySidebar.style.display = 'none';
		        overlayBg.style.display = "none";
		    } else {
		        mySidebar.style.display = 'block';
		        overlayBg.style.display = "block";
		    }
		}

		// Close the sidebar with the close button
		function w3_close() {
		    mySidebar.style.display = "none";
		    overlayBg.style.display = "none";
		}
        $scope.admin = $.inArray($location.path(), ['/admin']) === 1;
    });