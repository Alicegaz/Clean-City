(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditAreaController', AreaCtrl);

    AreaCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$log', 'FlashService', 'AreaSrvc'];

    function AreaCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $log, FlashService, AreaSrvc) {
        var vm = this;
        vm.area = null;
        vm.save = save;
        vm.reset = reset;
        
        
        function loadArea()
        {
            AreaSrvc.getOne($routeParams.areaId).then(function(area)
            {
	            console.log(area);
                vm.area = area;
            });
        }
        loadArea();
        function loadResponsibles()
        {
            ResponsibleSrvc.getAll().then(function(responsibles){
	            console.log(responsible);
                vm.responsibles = responsibles;
            });
        }
        
        function save(area)
        {
            var arr = area.geoPoints.split(',');
            var areaSave = vm.area;
            areaSave.geoPoints = arr;

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