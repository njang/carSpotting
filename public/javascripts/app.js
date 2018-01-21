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
  let cardElement = $('<div>', {class: 'clientCard card bg-primary text-white col col-3'});
  cardElement.append($('<h4>', {text: client.name}));
  // debugger;
  cardElement.append($('<p>', {text: client.location.streetAddress}));
  cardElement.append($('<p>', {text: client.phone}));
  // let displayElement = $('<input>', {id: 'display', placeholder: 0, disabled: true})

  // cardElement.attr('text', client.name);
  $('#clients').append(cardElement);
}
