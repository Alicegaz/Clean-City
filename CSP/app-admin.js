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
  ;

  $routeProvider.otherwise({
    redirectTo: '/'
  });
});
adminModule.controller('adminController', function ($scope, $http) {
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