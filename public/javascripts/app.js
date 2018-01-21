
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
  cardElement.append($('<i>', {class: 'material-icons', text: 'delete'}));
  $('#clients').append(cardElement);
}

const formatPhoneNumber = (phoneNumber) => {
  let digits = phoneNumber.toString().split('');
  return '(' + digits.slice(0, 3).join('') + ') ' + digits.slice(3, 6).join('') + '-' + digits.slice(-4).join('');
}