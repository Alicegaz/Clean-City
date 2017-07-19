controllersModule.controller('mainController', function ($scope, $compile, AreaSrvc) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 56, lng: 92},
    zoom: 8
  });
  AreaSrvc.getAll().then(
	  function(response){
	      for (var i = 0; i < response.data.length; i++) { 
	     	console.log(response.data[i]);
	     	var area = response.data[i];
	     	var coords = [];
	     	for (var j=0; j < area.geoPoints.length; j++) {
		     	coords.push({lat: area.geoPoints[j].latitude, lng: area.geoPoints[j].longitude})
		    }
		    console.log(coords);
	      	var polygon = new google.maps.Polygon({
    			map: map,
    			paths: coords,
    			strokeColor: '#FF0000',
    			strokeOpacity: 0.8,
    			strokeWeight: 3,
    			fillColor: '#FF0000',
   				fillOpacity: 0.35
             });
        var contentString = 'Наименование организации: ' + area.responsible.name + '<br/>' +' Телефон: '+ area.responsible.phone + '<br/>'+ 'E-mail: ' + 
        area.responsible.email
		var infowindow = new google.maps.InfoWindow({
			 content: contentString
		});
		polygon.addListener ('click', function(event){
			infowindow.open(map);
			infowindow.setPosition(event.latLng);
			
		});
		   		 
		  }
		  		
		  
	  });
	 
    })
