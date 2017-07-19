(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('newActController', NewActCtrl);

    NewActCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$log', '$routeParams', 'FlashService', 'CatSrvc', 'ActSrvc'];

    function NewActCtrl($location, $window, $rootScope, $scope, $timeout, $modal, $log, $routeParams, FlashService, CatSrvc, ActSrvc) {
        var vm = this;
        vm.act = null;
        vm.save = save;
        vm.cancel = cancel;
        vm.categories = null;
        vm.msg = '';
     
        
        
        function loadCategories()
        {
            CatSrvc.getAll().then(function(response){
	            console.log(response.data);
                $scope.categories = response.data;
            });
        }
        loadCategories();
        function save(act){
            if (ActSrvc){
                vm.act.area = {id:$routeParams.areaId};
                vm.act.status = {id:1};
                ActSrvc.update(vm.act).then(function() {
                    $timeout(function(){
                        cancel();
                    }, 300);
                })
            }
            
        }
        
        function cancel()
        {
            $location.path("/");
        }
       
    }
})();