(function () {
    'use strict';
    var app = angular
        .module('controllersModule')
        .controller('CategoriesController', CatCtrl);

    CatCtrl.$inject = ['$location', '$window', '$rootScope', '$scope', '$timeout', '$modal', 'FlashService', 'modalService', 'CatSrvc'];

    function CatCtrl($location, $window, $rootScope, $scope, $timeout, $modal, FlashService, modalService, CatSrvc) {
        var vm = this;
        vm.categories = null;
        
        vm.del = del;
		vm.save = save;
        function loadCategories() {
            vm.categories = CatSrvc.getAll()
            .then(function(result){
	            console.log(result)
                    vm.categories = result.data;
            })
        }
        
        loadCategories();


        function save(category)
        {
	        console.log(category);
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
            vm.name = category.name;
            delId = category.id;
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
