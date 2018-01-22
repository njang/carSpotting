
(() => {
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      clients.forEach((client) => {
        // $('#clients').append(clientCard(client));
        clientCard(client);
      });
    }
  });

  $('#add-client').append($('<button>', {class: 'btn btn-primary btn-add-client', 'data-toggle': 'modal', 'data-target': '#modalReset', text: 'Add client'}));
  $('.btn-remove-client').on('click', function() {
    handleDeleteClientClick();
  });

})();

// problem with buttons having their click assignment loaded.
// $(document).ready(function() {
// });
function init() {
  $('.btn-remove-client').on('click', function() {
    handleDeleteClientClick();
  });
}



const clientCard = (client) => {
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col-sm-2 col-md-3', 'data-client-id': client._id});

  let divElement = $('<div>' , {class: 'card-row-user row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons text-success', text: 'person'}));
  divElement.append($('<h4>', {class: 'col col-10', text: client.name}));
  cardElement.append(divElement);

  divElement = $('<div>' , {class: 'card-row-address row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'home'}));
  divElement.append($('<p>', {class: 'col col-10', html: formatAddress(client.location.streetAddress)}));
  cardElement.append(divElement);

  divElement = $('<div>' , {class: 'card-row-phone row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'phone'}));
  divElement.append($('<a>', {class: 'col col-10', href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  cardElement.append(divElement);

  divElement = $('<div>' , {class: 'card-row-lawn row'});
  divElement.append($('<i>', {class: 'col col-2 material-icons', text: 'schedule'}));
  divElement.append($('<p>', {class: 'col col-10', text: 'Last mowed: ' + howLongSince(client.lawn.lastMowed)}));
  cardElement.append(divElement);   

  // divElement = $('<div>' , {class: 'card-row row'});
  // cardElement.append($('<input>', {type: 'button', class: 'btn btn-remove-client btn-danger', value: 'remove', onclick: 'handleDeleteClientClick()'}));
  // divElement.append($('<button>', {class: 'btn btn-remove-client btn-danger', text: 'remove'}));
  // cardElement.append(divElement);   
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
  var targetId = $(this).parents('.clientCard').data('client-id');
  console.log('Request to delete ' + targetId);
  debugger;
}

// function to test delete function.
const deleteOne = (albumId) => {
  $.ajax({
    method: 'DELETE',
    url: ('/api/clients/' + albumId),
    success: function() {
      console.log("Deleted " + albumId);
      $('[data-client-id='+ albumId + ']').remove();
    }
  }); 
}