(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditResponsibleController', EditResponsibleController);

    EditResponsibleController.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$routeParams', '$log', 'FlashService', 'ResponsibleSrvc'];

    function EditResponsibleController($location, $window, $rootScope, $scope, $timeout, $modal, $routeParams, $log, FlashService, ResponsibleSrvc) {
        var vm = this;
        vm.responsible = null;
        vm.save = save;
        vm.reset = reset;
        vm.saved = false;
        
        vm.msg = 'Изменить';
        
        function isCreate()
        {
	        if (!$routeParams.id)
	        {
		        vm.msg = 'Сохранить';
		    }
	    }
	    
	    isCreate();
        
        function loadResponsible()
        {
	        if($routeParams.id){
            ResponsibleSrvc.getOne($routeParams.id).then(function(response)
            {
                vm.responsible = response.data;
            });
	        }
	        else
	        {
		        vm.responsible = {};
		    }
        }
        
        loadResponsible();
        function save()
        {
            if (ResponsibleSrvc)
                ResponsibleSrvc.update(vm.responsible)
            .then(function() {
                    $timeout(function(){
                        //loadResponsible();
                        vm.saved = true;
                        $location.path('/responsible');
                    }, 300);
                })
        }
        
        function reset()
        {
            loadResponsible();
        }
        

        //loadCategories();

       
    }
})();
