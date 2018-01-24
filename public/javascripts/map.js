
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

		let content = '<h4>' + props.name + '</h4>';
		content += '<div>' + formatAddress(props.location.streetAddress) +'</div>';
		content += '<div><a href="tel:' + props.phone + '">' + formatPhoneNumber(props.phone) + '</a></div>';
		content += '<div> <b>Lot</b>: ' + props.lawn.lotSize + '  acres | <b>Type</b>: ' + props.lawn.turfType + '</div>';
		
		var infoWindow = new google.maps.InfoWindow({
			// content: '<h4>' + props.name + '</h4><div>' + addressLines[0] + '</div><div>' + addressLines[1] + ', ' + addressLines[2] + '</div><div>' + formatPhoneNumber(props.phone) + '</div>'
			content: content
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

