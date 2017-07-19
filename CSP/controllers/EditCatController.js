(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditCatController', CatCtrl);

    CatCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$routeParams', '$log', 'FlashService', 'CatSrvc'];

    function CatCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $routeParams, $log, FlashService, CatSrvc) {
        var vm = this;
        vm.category = null;
        vm.save = save;
        vm.reset = reset;
        vm.saved = false;
        
        function loadCategory()
        {
	        if($routeParams.id){
            CatSrvc.getOne($routeParams.id).then(function(response)
            {
                vm.category = response.data;
                console.log(vm.category.name);
            });
	        }
        }
        
        loadCategory();
        function save()
        {
            if (CatSrvc)
                CatSrvc.update(vm.category)
            .then(function() {
                    $timeout(function(){
                        loadCategory();
                        vm.saved = true;
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
