(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('EditActController', EditActController);

    EditActController.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', '$routeParams', '$log', 'FlashService', 'ActSrvc'];

    function EditResponsibleController($location, $window, $rootScope, $scope, $timeout, $modal, $routeParams, $log, FlashService, ActSrvc) {
        var vm = this;
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
        
        function loadAct()
        {
            if($routeParams.id){
            ActSrvc.getOne($routeParams.id).then(function(response)
            {
                vm.act = response.data;
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
            if (ActSrvc)
                ActSrvc.update(vm.act)
            .then(function() {
                    $timeout(function(){
                        //loadResponsible();
                        vm.saved = true;
                        $location.path('/act');
                    }, 300);
                })
        }
        
        function reset()
        {
            loadAct();
        }
        

        //loadCategories();

       
    }
})();