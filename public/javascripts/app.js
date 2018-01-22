
(() => {
  $.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
      clients.forEach((client) => {
        clientCard(client);
      });
    }
  });

  $('#add-client').append($('<button>', {class: 'btn btn-primary btn-add-client material-icons', text: 'add'}));
  $('.btn-add-client').click(() => {
    console.log('Adding new client');
  });
  // $('.client').on('click', '.btn-remove-client', handleDeleteClientClick);
  // $('.btn-remove-client').on('click', () => {
  $('.btn-remove-client').click(() => {
    console.log('Removing client!');
  });
})();

const clientCard = (client) => {
  let cardElement = $('<div>', {class: 'clientCard card bg-dark text-white col col-3'});
  cardElement.append($('<i>', {class: 'material-icons', text: 'person'}));
  cardElement.append($('<h4>', {text: client.name}));
  cardElement.append($('<i>', {class: 'material-icons', text: 'home'}));
  cardElement.append($('<p>', {text: client.location.streetAddress}));
  cardElement.append($('<i>', {class: 'material-icons', text: 'phone'}));
  cardElement.append($('<a>', {href: 'tel:' + client.phone, text: formatPhoneNumber(client.phone)}));
  cardElement.append($('<p>', {text: 'Last mowed: ' + Date(client.lawn.lastMowed)}));
  // cardElement.append($('<i>', {class: 'btn material-icons', text: 'delete'}));                                       
  cardElement.append($('<button>', {class: 'btn btn-remove-client btn-danger material-icons', text: 'remove'}));
  $('#clients').append(cardElement);
}

const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().split('');
  return '(' + digits.slice(0, 3).join('') + ') ' + digits.slice(3, 6).join('') + '-' + digits.slice(-4).join('');
}

function handleDeleteClientClick(e) {
  var targetId = $(this).parents('.client').data('_id');
  console.log('Request to delete ' + targetId);
  // console.log('someone wants to delete album id=' + albumId );
  // $.ajax({
  //   method: 'DELETE',
  //   url: ('/api/albums/' + albumId),
  //   success: function() {
  //     console.log("He's dead Jim");
  //     $('[data-album-id='+ albumId + ']').remove();
  //   }
  // });
}