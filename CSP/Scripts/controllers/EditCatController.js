(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditCatController', CatCtrl);

    CatCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$log', 'FlashService', 'CatSrvc'];

    function CatCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $log, FlashService, CatSrvc) {
        var vm = this;
        vm.category = null;
        vm.save = save;
        vm.reset = reset;
        loadCategory();
        
        function loadCategory()
        {
            CatSrvc.getOne($routeParams.catId).then(function(category)
            {
                vm.category = category;
            });
        }
        
        
        function save()
        {
            if (CatSrvc)
                CatSrvc.update(vm.category)
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