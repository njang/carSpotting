// Initial render of clients
$(document).ready(function() {
  renderClientCards();
});

// Assemble client cards
const clientCard = (client) => {

  // Initiate a client card
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col-xs-12 col-md-6 col-lg-4 col-xl-3', 'data-client-id': client._id, 'data-toggle': 'collapse', href: '#panel-' + client._id});

  // A row to display the client name on top of the card
  let divElement = $('<div>', {class: 'card-row-user row'});
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

// Retrieve the client database and render them into card format.
const renderClientCards = () => {
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      // Clear the displayed cards and prepare for new cards to render
      $('#clients').html('');
      // Display the count of clients in the database
      let countMessage = ' found';
      if (clients.length > 1) {
      	countMessage = clients.length + ' clients';
      } else if (clients.length === 1) {
      	countMessage = '1 client';
      } else {
      	countMessage = 'No client';
      }
      countMessage += ' found';
      $('#clients').append($('<div>', {class: 'col col-12 text-right', text: countMessage}));      
      clients.forEach((client) => {
        clientCard(client);
      });
      // Update the map
      initMap();
    }
  });
}

// Calculates how long ago the time of event was, and returns it in unit of days
const howLongSince = (timeOfEvent) => {
  // let dt = Math.floor((new Date() - timeOfEvent * 1000) / 1000 / 60 / 60 / 24);
  let dt = Math.floor(((new Date() - new Date(timeOfEvent)) / 1000 / 60 / 60 / 24));
  let message = "";
  if (dt > 1) {
    message = dt + ' days ago';
  } else {
    message = 'Yesterday';
  }
  return message;
}