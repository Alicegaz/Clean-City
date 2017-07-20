(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('AreaController', ArCtrl);

    ArCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', 'FlashService', 'modalService', 'AreaSrvc'];

    function ArCtrl($location, $window, $rootScope, $scope, $timeout, $modal, FlashService, modalService, AreaSrvc) {
        var vm = this;
        vm.areas = null;
        vm.save = save;
        vm.del = del;
        
        

        function loadAreas() {
            vm.areas = AreaSrvc.getAll()
            .then(function(result){
                    vm.areas = result.data;
            })
        }

		loadAreas();
        function save(area)
        {
            $location.path('area/edit/'+area.id);
        }

        function del(area) {
		/*
        var modalOptions = {
            closeButtonText: 'Нет',
            actionButtonText: 'Да',
            headerText: 'Удалить территорию оветственного' + area.responsible + '?',
            bodyText: 'Вы действительно хотите удалить территорию?'

        };

        modalService.showModal({}, modalOptions)
        .then(function(result)
        {
            vm.name = area.responsible;
            delId = area.id;
            vm.error = false;
            CatSrvc.getOne(delId)
            .then(function(result){
                if (result.name)
                {
                    CatSrvc.deleteOne(delId);
                    FlashService.Success("The category is successfully deleted");
                }
                else
                {
                    FlashService.Error("Object is not found");
                }
            });
        });*/
        var delId = area.id;
        var isDelete = confirm("Вы действительно хотите удалить территорию?");
        if (isDelete) {
        AreaSrvc.deleteOne(delId);
        FlashService.Success("The category is successfully deleted");
        }
        }
        

    }
})();