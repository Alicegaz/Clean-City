(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('ActController', ActController);

    ActController.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', 'FlashService', 'modalService', 'ActSrvc'];

    function ActController($location, $window, $rootScope, $scope, $timeout, $modal, FlashService, modalService, ActSrvc) {
        var vm = this;
        vm.acts = null;
        
        vm.del = del;
		vm.save = save;
        function loadActs() {
            vm.acts = ActSrvc.getAll()
            .then(function(result){
	            console.log(result)
                    vm.acts = result.data;
            })
        }
        
        loadActs();


        function save(act)
        {
	        console.log(responsible);
            $location.path('act/edit/'+act.id);
        }

        function del(responsible) {
		/*
        var modalOptions = {
            closeButtonText: 'Нет',
            actionButtonText: 'Да',
            headerText: 'Удалить' + responsible.name + '?',
            bodyText: 'Вы действительно хотите удалить категорию?'

        };

        modalService.showModal({}, modalOptions)
        .then(function(result)
        {
            vm.name = responsible.name;
            delId = responsible.id;
            vm.error = false;
            ResponsibleSrvc.getOne(delId)
            .then(function(result){
                    ResponsibleSrvc.deleteOne(delId);
                    FlashService.Success("The category is successfully deleted");
            });
        });
        */
        var delId = act.id;
        var isDelete = confirm("Вы действительно хотите удалить организацию?");
        if (isDelete) {
        ResponsibleSrvc.deleteOne(delId);
        //FlashService.Success("The category is successfully deleted");
        }
        loadResponsibles();
        }
        

    }
})();
