function initMap() {
	// College Station GPS coordinate
	var bcs = {lat: 30.627977, lng: -96.3344068};
	// Bryan, TX GPS coordinate = {lat: 30.6743643, lng: -96.3699632};
	// var bcs = {lat: 30.65117065, lng: -96.352185};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: bcs
	});
	// Marker for the center of the initial map view
	var marker = new google.maps.Marker({
	  position: bcs,
	  map: map,
	  icon: 'images/grassIcon_32x32.png'
	});
	// Markers for the clients addresses
	var markers = locations.map(function(location, i) {
	  return new google.maps.Marker({
	    position: location,
	    // map: map
	    // label: labels[i % labels.length]
	  });
	});

	var infoWindow = new google.maps.InfoWindow({
		content: '<h3>College Station</h3><p>Welcome to Aggieland!</p>'
	});

	marker.addListener('click', function(){
		infoWindow.open(map, marker);
	});
}

var locations = [
	{lat: 30.578229, lng: -96.312584},
	{lat: 30.583794, lng: -96.308351},
	{lat: 30.583454, lng: -96.302962},
	{lat: 30.580536, lng: -96.299782},
	{lat: 30.575361, lng: -96.308799},
	{lat: 30.633446, lng: -96.336801},
	{lat: 30.634157, lng: -96.334427},
	{lat: 30.638992, lng: -96.332344},
	{lat: 30.640813, lng: -96.332750}
]