
// // IIFE for reference
// (() => {
// })();

// problem with buttons having their click assignment loaded.
$(document).ready(function() {

  // Retrieve the client database and render them into card format.
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      clients.forEach((client) => {
        clientCard(client);
      });
    }
  });

  // Add a button to add new client.
  $('#add-client').append($('<button>', {class: 'btn btn-danger btn-add-client align-top text-center material-icons md-2', 'data-toggle': 'modal', 'data-target': '#modalNewClient', text: 'library_add'}));
});


$(document).on('click', '.saveNewClient', (e) => {
  e.preventDefault();
  
  console.log('Saving new client');
  console.log('Name: ' + e.target.parentElement.name.value);
  console.log('Address: ' + e.target.parentElement.address.value);
  console.log('Phone: ' + formatPhoneNumber(e.target.parentElement.phone.value));

  let endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  let input = endpoint + encodeURIComponent(e.target.parentElement.address.value);
  let geocodeResult = {};

  const geocodeSuccess = (responseData) => {
    let message = '';
    switch (responseData.status) {
      case 'OK':
        message = responseData.results[0].formatted_address + ", " + responseData.results[0].geometry.location.lat + ", " + responseData.results[0].geometry.location.lng;
        break;
      case 'ZERO_RESULTS':
        message = 'No coordinates found';
        break;
      default:
        message = responseData.status;
    }
    // console.log(message);
    geocodeResult = {"streetAddress": responseData.results[0].formatted_address,
      "coordinates": {
        "lat": responseData.results[0].geometry.location.lat,
        "lng": responseData.results[0].geometry.location.lng
      }
    };
    return geocodeResult;
  };

  // $.ajax({
  //   // Define the kind of request as 'GET'
  //   method: 'GET',  
  //   // The URL for the request
  //   url: input,   
  //   // Code to run if the request succeeds 
  //   success: geocodeSuccess
  //   // success: {
  //   //   geocodeResult = geocodeSuccess()
  //   // }
  // });

  $.ajax({
    method: 'POST',
    url: '/api/clients',
    data: {
      name: e.target.parentElement.name.value,
      // location: {
      //   streetAddress: e.target.parentElement.address.value
      // },
      phone: e.target.parentElement.phone.value
    },
    success: newClientSuccess,
    error: newClientError
  });

  // location: {
  //   streetAddress: String,
  //   coordinates: {
  //     lat: Number,
  //     lng: Number
  //   }
  // },

  //     address: e.currentTarget["2"].value,
  //     releaseDate: e.currentTarget["3"].value,
  //     genres: e.currentTarget["4"].value.split(',')


  // Empty the form fields
  e.target.parentElement.reset();
});



function newClientSuccess(json) {
  console.log('new client success!');
}

function newClientError() {
  console.log('new client error!');
}


// Link editClient function to edit buttons
$(document).on('click', '.btn-edit-client', function(e) {
  editClient(e);
});

// Link removeClient function to remove buttons
$(document).on('click', '.btn-remove-client', function(e) {
  // console.log('Button clicked: remove client');
  removeClient(e);
});






// Assemble client cards
const clientCard = (client) => {
  // Initiate a client card
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col-xs-12 col-md-6 col-lg-4', 'data-client-id': client._id});


  // A row to display the client name on top of the card
  let divElement = $('<div>' , {class: 'card-row-user row', 'data-toggle': 'collapse', href: '#panel-' + client._id});
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
  divElement = $('<div>' , {class: 'card-row-phone row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-right', text: 'phone'}));
  divElement.append($('<a>', {class: 'col col-10', href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  infoElement.append(divElement);

  // A row to display pertinent lawn information
  divElement = $('<div>' , {class: 'card-row-lawn row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-right', text: 'schedule'}));
  divElement.append($('<p>', {class: 'col col-10', text: 'Last mowed: ' + howLongSince(client.lawn.lastMowed)}));
  infoElement.append(divElement);   

  divElement = $('<div>' , {class: 'card-row row'});
  // divElement.append($('<input>', {type: 'button', class: 'btn btn-remove-client btn-danger', value: 'Remove', onclick: 'deleteClient()'}));
  divElement.append($('<button>', {class: 'col col-3 offset-2 btn btn-edit-client btn-basic', text: 'Edit'}));
  divElement.append($('<button>', {class: 'col col-3 offset-2 btn btn-remove-client btn-danger', text: 'Remove'}));
  infoElement.append(divElement);   
  
  cardElement.append(infoElement);     
  // return cardElement;
  $('#clients').append(cardElement);
}

const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().split('');
  return '(' + digits.slice(0, 3).join('') + ') ' + digits.slice(3, 6).join('') + '-' + digits.slice(-4).join('');
}

const formatAddress = (address) => {
  let addressLines = address.split('.');
  return addressLines[0] + '<br>' + addressLines[1];
}

// Calculates how long ago the time of event was, and returns it in unit of days.
const howLongSince = (timeOfEvent) => {
    // debugger;
  let dt = Math.floor((new Date() - timeOfEvent * 1000) / 1000 / 60 / 60 / 24);
  let message = "";
  if (dt > 1) {
    message = dt + ' days ago';
  } else {
    message = 'Yesterday';
  }
  return message;
}

const editClient = (e) => {
  e.preventDefault();
  let targetId = e.target.parentElement.parentElement.parentElement.dataset.clientId;
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

const removeClient = (e) => {
  e.preventDefault();
  let targetId = e.target.parentElement.parentElement.parentElement.dataset.clientId;
  let url = '/api/clients/' + targetId;
  console.log('Request to delete ' + targetId);
  // debugger;
  $.ajax({
    method: 'DELETE',
    url: url,
    success: function() {
      console.log('Removed ' + targetId);
      $('[data-client-id='+ targetId + ']').remove();
    },
    error: function() {
      console.log('Remove client error!');
    }
  }); 
}
