servicesModule.factory('ActSrvc', function($http) {    
  return {
    getAll: function(){
      return $http.get('broker/act-list');
    },
    getOne: function(id){
      return $http.get('broker/act/'+id);
    },
    update: function(act){
      return $http.post('broker/act-save', act)
    },
    deleteOne: function(id)
    {
	    return $http.delete('broker/act/'+id);
	}
  }
})