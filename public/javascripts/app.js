
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
  // $('#add-client').append($('<button>', {class: 'btn btn-primary btn-add-client', 'data-toggle': 'modal', 'data-target': '#modalReset', text: 'Add client'}));
  $('#add-client').append($('<button>', {class: 'btn btn-primary btn-add-client', text: 'Add client'}));

  // Assign button functions for adding, editing, and removing client
  $('.btn-add-client').on('click', function() {
    console.log('Button clicked: add client');
  });
});


$(document).on('click', '.btn-edit-client', function() {
  console.log('Button clicked: edit client');
});

$(document).on('click', '.btn-remove-client', function(e) {
  // console.log('Button clicked: remove client');
  handleDeleteClientClick(e);
});

// Assemble client cards
const clientCard = (client) => {
  // Initiate a client card
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col-sm-2 col-md-4', 'data-client-id': client._id});

  // A row to display the client name on top of the card
  let divElement = $('<div>' , {class: 'card-row-user row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-success', text: 'person'}));
  divElement.append($('<h4>', {class: 'col col-10', text: client.name}));
  cardElement.append(divElement);

  // A row to display the client's address
  divElement = $('<div>' , {class: 'card-row-address row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'home'}));
  divElement.append($('<p>', {class: 'col col-10', html: formatAddress(client.location.streetAddress)}));
  cardElement.append(divElement);

  // A row to display the client's phone number. 
  divElement = $('<div>' , {class: 'card-row-phone row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'phone'}));
  divElement.append($('<a>', {class: 'col col-10', href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  cardElement.append(divElement);

  // A row to display pertinent lawn information
  divElement = $('<div>' , {class: 'card-row-lawn row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'schedule'}));
  divElement.append($('<p>', {class: 'col col-10', text: 'Last mowed: ' + howLongSince(client.lawn.lastMowed)}));
  cardElement.append(divElement);   

  divElement = $('<div>' , {class: 'card-row row'});
  // divElement.append($('<input>', {type: 'button', class: 'btn btn-remove-client btn-danger', value: 'Remove', onclick: 'handleDeleteClientClick()'}));
  divElement.append($('<button>', {class: 'col col-3 offset-2 btn btn-edit-client btn-basic', text: 'Edit'}));
  divElement.append($('<button>', {class: 'col col-3 offset-2 btn btn-remove-client btn-danger', text: 'Remove'}));
  cardElement.append(divElement);   
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

// function handleDeleteClientClick(event) {
const handleDeleteClientClick = (e) => {
  e.preventDefault();
  let targetId = e.target.parentElement.parentElement.dataset.clientId;
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
