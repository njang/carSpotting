(() => {
  console.log('/public/javascript/app.js is loaded');
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
  let cardElement = $('<div>', {class: 'clientCard'});
  cardElement.append($('<h3>', {text: client.name}));
  cardElement.append($('<p>', {text: client.phone}));
  // let displayElement = $('<input>', {id: 'display', placeholder: 0, disabled: true})

  // cardElement.attr('text', client.name);
  $('#clients').append(cardElement);
}
