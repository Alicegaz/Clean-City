(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('CategoriesController', CatCtrl);

    CatCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', 'FlashService', 'modalService', 'CatSrvc'];

    function CatCtrl($location, $window, $rootScope, $scope, $log, $timeout, $modal, FlashService, modalService, CatSrvc) {
        var vm = this;
        vm.categories = null;
        
        vm.del = del;
        
        loadCategories();

        function loadCategories() {
            vm.categories = CatSrvc.getAll()
            .then(function(result){
                if(result.name)
                {
                    vm.categories = result;
                }
                else
                {
                    $scope.sendError = "Ошибка";
                }
            })
        }

        function save(category)
        {
            $location.path('categories/edit/'+category.id);
        }

        function del(category) {

        var modalOptions = {
            closeButtonText: 'Нет',
            actionButtonText: 'Да',
            headerText: 'Удалить' + category.name + '?',
            bodyText: 'Вы действительно хотите удалить категорию?'

        };

        modalService.showModal({}, modalOptions)
        .then(function(result)
        {
            vm.name = cat.name;
            delId = cat.id;
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
        });
        }
        

    }
})();