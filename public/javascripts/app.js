
$(document).ready(function() {
  // Initial render of clients
  renderClientCards();

  // Add a button to add new client.
  $('#add-client').append($('<button>', {class: 'btn btn-danger btn-add-client align-top text-center material-icons md-2', 'data-toggle': 'modal', 'data-target': '#modalNewClient', text: 'library_add'}));
});

// Edit client info
$(document).on('click', '.btn-edit-client', (e) => {
  e.preventDefault();
  let targetClientId = e.target.closest('.clientCard').dataset.clientId;

  // Populate the input fields with current values
  $('#editModalName').val(e.target.closest('.clientCard').childNodes[0].childNodes[1].textContent);
  $('#editModalAddress').val(e.target.closest('.clientCard').childNodes[1].childNodes[0].childNodes[1].textContent);
  $('#editModalPhone').val(e.target.closest('.clientCard').childNodes[1].childNodes[1].childNodes[1].textContent.replace('/\s/g',''));
});

// 
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

// Saving new client into database
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
    success: newClientSuccess,
    error: newClientError
  });

  // Empty the form fields
  newClientInput.reset();
  // Re-render the cards
  renderClientCards();
});

function newClientSuccess(json) {
  console.log('new client success!');
}

function newClientError() {
  console.log('new client error!');
}

// Link editClient function to edit buttons
$(document).on('click', '.btn-edit-client', function(e) {
  // editClient(e);
});

// Link removeClient function to remove buttons
// $(document).on('click', '.btn-remove-client', function(e) {
//   // console.log('Button clicked: remove client');
// });

// Retrieve the client database and render them into card format.
const renderClientCards = () => {

  // Call the database and render client cards
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      // Clear the displayed cards and prepare for new cards to render
      $('#clients').html('');
      // Display the count of clients in the database
      $('#clients').append($('<div>', {class: 'col col-12 text-right', text: clients.length + ' clients found'}));      
      clients.forEach((client) => {
        clientCard(client);
      });
      // Update the map
      initMap();
    }
  });
}

// Assemble client cards
const clientCard = (client) => {

  // Initiate a client card
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col-xs-12 col-md-6 col-lg-4 col-xl-3', 'data-client-id': client._id});

  // A row to display the client name on top of the card
  let divElement = $('<div>', {class: 'card-row-user row', 'data-toggle': 'collapse', href: '#panel-' + client._id});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-success text-right', text: 'person'}));
  divElement.append($('<h4>', {class: 'col col-10', text: client.name}));
  cardElement.append(divElement);

  // Add a collapsible section inside the card
  let infoElement = $('<div>', {id: 'panel-' + client._id, class: 'collapse'}); 

  // A row to display the client's address
  divElement = $('<div>', {class: 'card-row-address row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-right', text: 'home'}));
  divElement.append($('<p>', {class: 'col col-10', html: formatAddress(client.location.streetAddress)}));
  infoElement.append(divElement);

  // A row to display the client's phone number. 
  divElement = $('<div>', {class: 'card-row-phone row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-right', text: 'phone'}));
  divElement.append($('<a>', {class: 'col col-10', href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  infoElement.append(divElement);

  // A row to display pertinent lawn information
  divElement = $('<div>', {class: 'card-row-lawn row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-right', text: 'schedule'}));
  divElement.append($('<p>', {class: 'col col-10', text: 'Last mowed: ' + howLongSince(client.lawn.lastMowed)}));
  infoElement.append(divElement);   

  divElement = $('<div>', {class: 'card-row row'});
  // divElement.append($('<input>', {type: 'button', class: 'btn btn-remove-client btn-danger', value: 'Remove', onclick: 'deleteClient()'}));
  divElement.append($('<button>', {class: 'col col-sm-4 offset-1 btn btn-edit-client btn-basic', 'data-toggle': 'modal', 'data-target': '#modalEditClient', text: 'Edit'}));
  divElement.append($('<button>', {class: 'col col-sm-4 offset-2 btn btn-remove-client btn-danger', 'data-toggle': 'modal', 'data-target': '#modalRemoveClient', text: 'Remove'}));
  infoElement.append(divElement);   
  
  // Define confirmation modal for deleting client
  divElement = $('<div>', {id: 'modalRemoveClient', class: 'modal fade', role: 'dialog'});
  divElement.append($('<div>', {class: 'modal-dialog modal-md'})
      .append($('<div>', {class: 'modal-content'})
        .append($('<div>', {class: 'modal-body text-left text-dark', text: 'Are you sure to remove this client?'}))
        .append($('<div>', {class: 'modal-footer'})
          .append($('<button>', {class: 'btn btn-danger btn-remove-client', 'data-dismiss': 'modal', text: 'Remove'}))
          .append($('<button>', {class: 'btn btn-basic', 'data-dismiss': 'modal', text: 'Cancel'}))
      )
    )
  )
  // infoElement.append(divElement);   
  cardElement.append(infoElement);     

  // return cardElement;
  $('#clients').append(cardElement);
}

const editClient = (e) => {
  e.preventDefault();
  let targetId = e.target.closest('.clientCard').dataset.clientId;
  let url = '/api/clients/' + targetId + '/edit';
  console.log('Request to edit ' + targetId + ' via ' + url);
  $.ajax({
    method: 'PATCH',
    url: url,
    success: function() {
      console.log('Edited ' + targetId);
    },
    error: function() {
      console.log('Edit client error!');
    }
  });
}

const removeClient = (id) => {
  let url = '/api/clients/' + id;
  $.ajax({
    method: 'DELETE',
    url: url,
    success: function() {
      console.log('Removed ' + id);
    },
    error: function() {
      console.log('Remove client error!');
    }
  }); 
  renderClientCards();
}

const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().split('');
  return '(' + digits.slice(0, 3).join('') + ') ' + digits.slice(3, 6).join('') + '-' + digits.slice(-4).join('');
}

const formatAddress = (address) => {
  let addressLines = address.split(',');
  return addressLines[0] + '<br>' + addressLines[1] + ', ' + addressLines[2];
}

// Calculates how long ago the time of event was, and returns it in unit of days.
const howLongSince = (timeOfEvent) => {
  let dt = Math.floor((new Date() - timeOfEvent * 1000) / 1000 / 60 / 60 / 24);
  let message = "";
  if (dt > 1) {
    message = dt + ' days ago';
  } else {
    message = 'Yesterday';
  }
  return message;
}