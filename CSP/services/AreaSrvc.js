servicesModule.factory('AreaSrvc', function($http) {    
    return {
    	getAll: function(){
    		return $http.get('broker/area-list');
		}
	}
})