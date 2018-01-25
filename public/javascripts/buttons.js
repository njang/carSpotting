// Link all buttons to their respective functions

// Modal for creating a new client
// Partial entry of address uses Google Maps Geocode API to parse to formatted street address and GPS coordinates
$(document).on('click', '.saveNewClient', (e) => {
  e.preventDefault();

  let newClientInput = e.target.parentElement.parentElement.parentElement;

  // Output the captured information on the New Client Form  
  console.log('Saving new client');
  console.log('Name: ' + newClientInput.name.value);
  console.log('Address: ' + newClientInput.address.value);
  console.log('Phone: ' + formatPhoneNumber(newClientInput.phone.value));
  console.log('Lawn: ' + newClientInput.turfType.value);
  console.log('Last mowed: ' + newClientInput.lastMowed.value);

  // Add geocode converter
  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  let url = endpoint + encodeURIComponent(newClientInput.address.value);
  let geocodeResult = {};
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
          geocodeResult.address = responseData.results[0].formatted_address;
          geocodeResult.lat = responseData.results[0].geometry.location.lat;
          geocodeResult.lng = responseData.results[0].geometry.location.lng;
          console.log(geocodeResult);
          break;
        case 'ZERO_RESULTS':
          message = 'No coordinates found';
          break;
        default:
          message = responseData.status;
      }
      console.log(message);
    }
  });

  $.ajax({
    method: 'POST',
    url: '/api/clients',
    data: {
      name: newClientInput.name.value,
      location: {
        streetAddress: newClientInput.address.value
      },
      phone: newClientInput.phone.value,
      lawn: {
        turfType: newClientInput.turfType.value,
        lastMowed: newClientInput.lastMowed.value
      }
    },
    success: () => {
    	console.log('new client success!')
    },
    error: () => {
  		console.log('new client error!')
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

  // Populate the input fields with current values
  $('#editModalName').val(e.target.closest('.clientCard').childNodes[0].childNodes[1].textContent);
  $('#editModalAddress').val(e.target.closest('.clientCard').childNodes[1].childNodes[0].childNodes[1].textContent);
  $('#editModalPhone').val(e.target.closest('.clientCard').childNodes[1].childNodes[1].childNodes[1].textContent.replace('/\s/g',''));
});

// Modal for deleting a client
// Once confirmed, confirm-delete button executes the delete operation
$(document).on('click', '.btn-remove-client', (e) => {
  e.preventDefault();
  let targetClientId = e.target.closest('.clientCard').dataset.clientId;
  // Populate the input fields with current values
  $('.removeClientConfirm').val(e.target.closest('.clientCard').childNodes[0].childNodes[1].textContent);

  $(document).on('click', '.btn-remove-client-confirm', (e) => {
    e.preventDefault();
    removeClient(targetClientId);
  });
});