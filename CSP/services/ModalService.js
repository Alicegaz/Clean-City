servicesModule.service('modalService', ['$modal', 

	function($modal){

		var modalDefaults = {
			backdrop: true,
			keyboard: true,
			modalFade: true,
			templateUrl: '/pages/admin/popups/popup.csp'
		};

		var modalOptions = {
			closeButtonText: 'Close',
			actionButtonText: 'OK',
			headerText: 'Proceed?',
			bodyText: 'Perform this action?'
		};

		this.showModal = function (customModalDefaults, customModalOptions)
		{
			if (!customModalDefaults) customModalDefaults = {};
			customModalDefaults.backdrop = 'static';
			return this.show(customModalDefaults, customModalOptions);
		};

		this.show = function (customModalDefaults, customModalOptions)
		{
			var tempModalDefaults = {};
			var tempModalOptions = {};

			angular.extend(tempModalDefaults, modalDefaults, customModalDefaults, customModalOptions);

			angular.extend(tempModalOptions, modalOptions, customModalOptions, customModalDefaults);

			if (!tempModalDefaults.controller)
			{
				tempModalDefaults.controller = function($scope, $modalInstance)
				{
					$scope.modalOptions = tempModalOptions;
					$scope.modalOptions.ok = function (result)
					{
						$modalInstance.close(result);
					};
					$scope.modalOptions.close = function (result)
					{
						$modalInstance.dismiss('cancel');
					};
				};
			}
			return $modal.open(tempModalDefaults).result;
		};
	}]);