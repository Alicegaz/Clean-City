controllersModule.controller('mainController', function ($scope, $compile, AreaSrvc) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
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
	      	var area = new google.maps.Polygon({
    			map: map,
    			paths: coords,
    			strokeColor: '#FF0000',
    			strokeOpacity: 0.8,
    			strokeWeight: 3,
    			fillColor: '#FF0000',
   				fillOpacity: 0.35
             });
		  }
	  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var Coords = [
  {lat: 25.774, lng: -80.190},
  {lat: 18.466, lng: -66.118},
  {lat: 32.321, lng: -64.757}
  ];

  
  var Area = new google.maps.Polygon({
    map: map,
    paths: Coords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  
  Area.setMap(map);

  // Add a listener for the click event.
  Area.addListener('click', showArrays);

  infoWindow = new google.maps.InfoWindow;

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }


  /** @this {google.maps.Polygon} */
  function showArrays(event) {
        var vertices = this.getPath();
        var contentString = '<b>Bermuda Triangle polygon</b><br>' +
        'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
        '<br>';

        // Iterate over the vertices.
        /*for (var i =0; i < vertices.getLength(); i++) {
          var xy = vertices.getAt(i);
          contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
          xy.lng();
        } */

       // Replace the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);

        infoWindow.open(map);
      }


    })
