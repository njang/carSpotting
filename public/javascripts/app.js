(() => {
	console.log('/public/javascript/app.js is loaded');
	$.ajax({
    method: 'GET',
    url: '/api/clients',
    success: (clients) => {
    	console.log(clients);
			clients.forEach((client) => {
				console.log(client.name);
			});
    }
  });

})();
