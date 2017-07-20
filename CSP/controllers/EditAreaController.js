(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditAreaController', AreaCtrl);

    AreaCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$log', '$routeParams', 'FlashService', 'AreaSrvc', 'ResponsibleSrvc'];

    function AreaCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $log, $routeParams, FlashService, AreaSrvc, ResponsibleSrvc) {
        var vm = this;
        vm.formData = null;
        vm.save = save;
        vm.reset = reset;
        vm.responsibles = null;
        vm.msg = '';
        
        vm.message = 'Изменить';
        
        function isCreate()
        {
	        if (!$routeParams.id)
	        {
		        vm.message = 'Сохранить';
		    }
	    }
	    
	    isCreate();
        
        function loadArea()
        {
	        if ($routeParams.id)
	        {
            AreaSrvc.getOne($routeParams.id).then(function(response)
            {
	            var area = response.data;
	            console.log(response.data);
	            var geoPointsString = "";
	            //console.log(area.geoPoints);
	            for (var i = 0; i<area.geoPoints.length; i++)
	            {
		            console.log("entered");
		            var str =area.geoPoints[i].latitude.toString()+','+area.geoPoints[i].longitude.toString()+' ';
		        	geoPointsString+=str;
		        }
	            //console.log(geoPointsString);
	            //console.log(vm.formData)
	            var responsible = null;
	            console.log(vm.responsibles);
	            console.log(area.responsible);
	            for (var i = 0; i<vm.responsibles.length; i++){
		            if (vm.responsibles[i].id == area.responsible.id) responsible = vm.responsibles[i];
	            }
	            console.log(responsible);
                vm.formData = {
	                geoPoints:geoPointsString, 
                	responsible:responsible
                };
            });
	        }
	        else{
		        vm.formData = {
			        responsible:vm.responsibles[0]
			    };
	        }
        }
        function loadResponsibles()
        {
            ResponsibleSrvc.getAll().then(function(response){
	            //console.log(response.data);
                vm.responsibles = response.data;
        		loadArea();
            });
        }
        loadResponsibles();
        function save()
        {
            var arr = vm.formData.geoPoints.split(' ');
            var list_of_pairs = [];
            for (var i = 0; i<arr.length; i++)
            {
	            var arrPoints = arr[i].toString().split(',');
	            var geoPoint = {latitude:arrPoints[0], longitude: arrPoints[1]};
	            if(arrPoints.length!=2)
	            {
		            vm.msg = "Необходимо ввести данные в формате 'число,число число,число'";
		        	vm.danger = true;
		        }
	            list_of_pairs.push(geoPoint);      
	        }
	        console.log(list_of_pairs);
            var area = {
	            geoPoints:list_of_pairs,
	            responsible: vm.formData.responsible
            };
            console.log(area);
            if (AreaSrvc)
                AreaSrvc.update(area)
            .then(function() {
                    $timeout(function(){
                        //loadCategory();
                        $location.path('/area');
                    }, 300);
                })
        }
        
        function reset()
        {
            loadArea();
        }
        

        //loadCategories();

       
    }
})();
