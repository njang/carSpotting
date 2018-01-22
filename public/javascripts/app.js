
(() => {
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      clients.forEach((client) => {
        $('#clients').append(clientCard(client));
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
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col col-4', 'data-client-id': client._id});
  // let cardElement = $('<div>', {class: 'clientCard', 'data-client-id': client._id});
  // cardElement.append($('<i>', {class: 'material-icons', text: 'person'}));
  cardElement.append($('<h4>', {text: client.name}));
  // cardElement.append($('<i>', {class: 'material-icons', text: 'home'}));
  cardElement.append($('<p>', {text: client.location.streetAddress}));
  // cardElement.append($('<i>', {class: 'material-icons', text: 'phone'}));
  cardElement.append($('<a>', {href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  // cardElement.append($('<p>', {text: 'Last mowed: ' + Date(client.lawn.lastMowed)}));
  // cardElement.append($('<i>', {class: 'btn material-icons', text: 'delete'}));                                       
  // cardElement.append($('<input>', {type: 'button', class: 'btn btn-remove-client btn-danger', value: 'remove', onclick: 'handleDeleteClientClick()'}));
  cardElement.append($('<button>', {class: 'btn btn-remove-client btn-danger', text: 'remove'}));
  // $('#clients').append(cardElement);
  return cardElement;
}

const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().split('');
  return '(' + digits.slice(0, 3).join('') + ') ' + digits.slice(3, 6).join('') + '-' + digits.slice(-4).join('');
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