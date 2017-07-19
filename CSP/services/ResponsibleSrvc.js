servicesModule.factory('ResponsibleSrvc', function($http) {    
    return {
     getAll: function(){
      return $http.get('broker/responsible-list');
  	},
  	getOne: function(id){
  		return $http.get('broker/responsible/'+id);
  	},
	update: function(responsible){
		return $http.post('broker/responsible-save', responsible);
	},
	deleteOne: function(id){
		return '';	
	}
	  	
 }
})