controllersModule.controller('mainController', function ($scope, $compile, AreaSrvc) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 56.007996, lng:  92.853742},
    zoom: 11
  });
  var shownInfoWindow = null;
  AreaSrvc.getAll().then(
    function(response){
      shownInfoWindow = null;
      for (var i = 0; i < response.data.length; i++) { 
        createPolygon(response.data[i]);
      }
    });

  function createPolygon (area) {
    var coords = [];
    for (var j=0; j < area.geoPoints.length; j++) {
      coords.push({lat: area.geoPoints[j].latitude, lng: area.geoPoints[j].longitude})
    }
    var polygon = new google.maps.Polygon({
      map: map,
      paths: coords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    var contentString = '<h3>Ответственная организация</h3>'+'<div style="margin-top: 5px;">Наименование организации: ' + area.responsible.name + '</div>' +
    '<div class="w3-margin-top">Телефон: ' + area.responsible.phone + '</div>'+ 
    '<div class="w3-margin-top">E-mail: ' + area.responsible.email + '</div>'+ 
    '<a class="w3-button w3-white w3-border w3-border-black w3-round-large w3-margin-top" onclick="window.location.hash=\'!/newAct/'+area.id+'\'">Создать обращение</a>';
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });
    polygon.addListener ('click', function(event){
      if (shownInfoWindow != null) {
        shownInfoWindow.close();
      }
      shownInfoWindow = infoWindow;
      infoWindow.open(map);
      infoWindow.setPosition(event.latLng);
    });
  }
})
