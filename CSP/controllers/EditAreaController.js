(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditAreaController', AreaCtrl);

    AreaCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$log', '$routeParams', 'FlashService', 'AreaSrvc'];

    function AreaCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $log, $routeParams, FlashService, AreaSrvc) {
        var vm = this;
        vm.area = null;
        vm.save = save;
        vm.reset = reset;
        vm.responsibles = null;
        vm.msg = '';
        
        function loadArea()
        {
	        if ($routeParams.id)
	        {
            AreaSrvc.getOne($routeParams.id).then(function(area)
            {
	            console.log(area);
                vm.area = area;
            });
	        }
	        else{
		        vm.area = {};
		        }
        }
        loadArea();
        function loadResponsibles()
        {
            ResponsibleSrvc.getAll().then(function(responsibles){
	            console.log(responsible);
                vm.responsibles = responsibles;
            });
        }
        loadResponsibles();
        function save(area)
        {
            var arr = vm.area.geoPoints.split(' ');
            var list_of_pairs = [];
            for (var i = 0; i<arr.size(); i++)
            {
	            var geoPoint = [];
	            var arrPoints = arr[i].split(',');
	            geoPoint.latitude = arrPoints[0];
	            geoPoint.longitude = arrPoints[1];
	            if(arrPoints.size()>2)
	            {
		            msg = "Необходимо ввести данные в формате 'число,число число,число'";
		        }
	            list_of_pairs.push(geoPoint);      
	        }
            var areaSave = vm.area;
            areaSave.geoPoints = list_of_pairs;
            
            if (CatSrvc)
                CatSrvc.update(areaSave)
            .then(function() {
                    $timeout(function(){
                        loadCategory();
                    }, 300);
                })
        }
        
        function reset()
        {
            loadCategory();
        }
        

        //loadCategories();

       
    }
})();