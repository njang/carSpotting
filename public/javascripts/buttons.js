// Link all buttons to their respective functions

// Add a button to add new client.
(() => {
  $('#add-client').append($('<button>', {class: 'btn btn-danger btn-add-client align-top text-center material-icons md-2', 'data-toggle': 'modal', 'data-target': '#modalNewClient', text: 'library_add'}));
})()

// Modal for creating a new client
// Partial entry of address uses Google Maps Geocode API to parse to formatted street address and GPS coordinates
$(document).on('click', '.saveNewClient', (e) => {
  e.preventDefault();
  let newClientInput = e.target.closest('form');
  // Add geocode converter
  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  let url = endpoint + encodeURIComponent(newClientInput.addModalAddress.value);
  $.ajax({
    // Define the kind of request as 'GET'
    method: 'GET',  
    // The URL for the request
    url: url,   
    // Code to run if the request succeeds 
    success: (responseData) => {
      let message = '';
      switch (responseData.status) {
        case 'OK':
          $('#addModalAddress').val(responseData.results[0].formatted_address);
          $('#addModalLat').val(responseData.results[0].geometry.location.lat);
          $('#addModalLng').val(responseData.results[0].geometry.location.lng);
          console.log('Client address modified prior to save');
          break;
        case 'ZERO_RESULTS':
          message = 'No coordinates found';
          break;
        default:
          message = responseData.status;
      }
    }
  });


  $.ajax({
    method: 'POST',
    url: '/api/clients',
    data: {
      name: newClientInput.addModalName.value,
      location: {
        streetAddress: newClientInput.addModalAddress.value,
        coordinates: {
          lat: newClientInput.addModalLat.value,
          lng: newClientInput.addModalLng.value
        }
      },
      phone: newClientInput.addModalPhone.value,
      lawn: {
        lotSize: newClientInput.addModalLotSize.value,
        turfType: newClientInput.addModalTurfType.value,
        lastMowed: newClientInput.addModalLastMowed.value
      }
    },
    success: (result) => {
    	console.log('New client added successfully.' + result._id)
    },
    error: () => {
  		console.log('Error: new client was not added.')
    }
  });

  // Empty the form fields
  newClientInput.reset();
  // Re-render the cards
  renderClientCards();
});

// Modal for editing a client
$(document).on('click', '.btn-edit-client', (e) => {
  e.preventDefault();
  let targetClientId = e.target.closest('.clientCard').dataset.clientId;
  // Get patient information
  $.ajax({
    method: 'GET',
    url: '/api/clients/' + targetClientId,
    success: (client) => {
      // Populate the input fields with current values
      $('#editModalName').val(client.name);
      $('#editModalAddress').val(client.location.streetAddress);
      $('#editModalPhone').val(formatPhoneNumber(client.phone));
      $('#editModalTurfType').val(client.lawn.turfType);
      $('#editModalLastMowed').val(client.lawn.lastMowed);
    }
  });
});

// Modal for deleting a client
// Once confirmed, confirm-delete button executes the delete operation
$(document).on('click', '.btn-remove-client', (e) => {
  e.preventDefault();
  let targetClientId = e.target.closest('.clientCard').dataset.clientId;
  // Populate the input fields with current values
  $('.removeClientConfirm').text(e.target.closest('.clientCard').childNodes[0].childNodes[1].textContent);

  $(document).on('click', '.btn-remove-client-confirm', (e) => {
    e.preventDefault();
    removeClient(targetClientId);
  });
});