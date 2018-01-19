
// let locations = [
// 	{coordinates: {lat: 30.578229, lng: -96.312584}},
// 	{coordinates: {lat: 30.583794, lng: -96.308351}},
// 	{coordinates: {lat: 30.583454, lng: -96.302962}},
// 	{coordinates: {lat: 30.580536, lng: -96.299782}},
// 	{coordinates: {lat: 30.575361, lng: -96.308799}},
// 	{coordinates: {lat: 30.633446, lng: -96.336801}},
// 	{coordinates: {lat: 30.634157, lng: -96.334427}},
// 	{coordinates: {lat: 30.638992, lng: -96.332344}},
// 	{coordinates: {lat: 30.640813, lng: -96.332750}}
// ]

function initMap() {
	// College Station GPS coordinate

	var bcs = {
		coords: {lat: 30.627977, lng: -96.3344068},
		icon: 'images/grassIcon_32x32.png'
	};
	// Bryan, TX GPS coordinate = {lat: 30.6743643, lng: -96.3699632};
	// var bcs = {lat: 30.65117065, lng: -96.352185};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: bcs.coords
	});

	// Marker for the center of the initial map view
	// var marker = new google.maps.Marker({
	//   position: bcs,
	//   map: map,
	//   icon: 'images/grassIcon_32x32.png'
	// });




	const addMarker = (props) => {
		let marker = new google.maps.Marker({
		  position: props.location.coordinates,
		  map: map
		});

		var infoWindow = new google.maps.InfoWindow({
			content: '<h3>' + props.name + '</h3><p>' + props.phone + '</p>'
		});

		// Check for custom icon
		if(props.icon) {
			marker.setIcon(props.icon);
		}
		if(props.name) {
			marker.addListener('click', function(){
				infoWindow.open(map, marker);
			});
		}
	}
	// addMarker(bcs);
	// for (let i = 0; i < locations.length; i++) {
	// 	addMarker(locations[i]);
	// }


	$(document).ready(() => {
	  $.get('/api/clients', (clients) =>  {
	    clientList = clients;
	    clients.forEach(function(client) {
	      // console.log(client.name);
	      addMarker(client);
	    });
	  });
	});

}

