servicesModule.factory('CatSrvc', function($http) {    
    return {
     getAll: function(){
      return $http.get('broker/category-list');
  	},
  	getOne: function(id){
  		return $http.get('broker/category/'+id);
  	},
	update: function(category){
		return $http.post('broker/category-save', category);
	},
	deleteOne: function(id){
		return '';	
	}
	  	
 }
})