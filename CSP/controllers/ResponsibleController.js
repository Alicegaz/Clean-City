(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('ResponsibleController', ResponsibleController);

    ResponsibleController.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', 'FlashService', 'modalService', 'ResponsibleSrvc'];

    function ResponsibleController($location, $window, $rootScope, $scope, $timeout, $modal, FlashService, modalService, ResponsibleSrvc) {
        var vm = this;
        vm.responsibles = null;
        
        vm.del = del;
		vm.save = save;
        function loadResponsibles() {
            vm.categories = ResponsibleSrvc.getAll()
            .then(function(result){
	            console.log(result)
                    vm.responsibles = result.data;
            })
        }
        
        loadResponsibles();


        function save(responsible)
        {
	        console.log(responsible);
            $location.path('responsible/edit/'+responsible.id);
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
        var delId = responsible.id;
        var isDelete = confirm("Вы действительно хотите удалить организацию?");
        if (isDelete) {
        ResponsibleSrvc.deleteOne(delId);
        FlashService.Success("The category is successfully deleted");
        }
        loadResponsibles();
        }
        

    }
})();
