
(() => {
	// $('#geocode').append($('<form>', {text: 'Enter address'}));
	$('#geocode').text('Enter address');
	$('#geocode').append($('<input>', {type: 'text', id: 'address'}));
	$('#geocode').append($('<button>', {type: 'submit', id: 'submit', text: 'Coordinates'}));
	$('#geocode').append($('<span>', {id: 'gpsResult'}));
})();

const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='

$(document).ready(function(){
  $("button").click(function(event){
		event.preventDefault();
		let whichButton = event.target.id;
		let input = endpoint + encodeURIComponent($("#address").val());
		switch (whichButton) {
			case 'submit':
				$.ajax({
				  // Define the kind of request as 'GET'
				  method: 'GET',  
				  // The URL for the request
				  url: input,   
				  // Code to run if the request succeeds 
				  success: onSuccess
				});
				break;
		}

		// Clear the text entry box.
		$("#address").val('');
  });
});

function onSuccess(responseData) {
	let message = '';
	switch (responseData.status) {
		case 'OK':
			message = responseData.results[0].geometry.location.lat + ", " +  responseData.results[0].geometry.location.lng;
			break;
		case 'ZERO_RESULTS':
			message = 'No coordinates found';
			break;
		default:
			message = responseData.status;
	}
	$("#gpsResult").text(message);
};
