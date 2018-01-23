
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

