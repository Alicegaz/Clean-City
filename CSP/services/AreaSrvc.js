servicesModule.factory('AreaSrvc', function($http) {    
  return {
    getAll: function(){
      return $http.get('broker/area-list');
    },
    getOne: function(id){
      return $http.get('broker/area/'+id);
    },
    update: function(area){
      return $http.post('broker/area-save', area)
    }
  }
})