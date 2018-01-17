var express = require('express');
var router = express.Router();

/**********
 * ROUTES *
 **********/

/* GET home page. */
router.get('/', function homepage (req, res, next) {
  res.render('index', { title: 'Lawn Tracker' });
});

/* JSON API Endpoints */
router.get('/api', function api_index (req, res){
  res.json({
    message: "Lawn Tracker App for Lawnsworth",
    documentation_url: "https://github.com/njang/lawnTracker/blob/master/README.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api/clients", description: "Show all clients"},
      {method: "GET", path: "/api/clients/new", description: "Show new client form"},
      {method: "POST", path: "/api/clients", description: "Create a client"},
      {method: "GET", path: "/api/clients/:id", description: "Show client with :id"},
      {method: "GET", path: "/api/clients/:id/edit", description: "Edit client with :id"},
      {method: "PATCH", path: "/api/clients/:id", description: "Update client with :id"},
      {method: "GET", path: "/api/clients/:id/delete", description: "Show delete form for a client with :id"},
      {method: "DELETE", path: "/api/clients/:id", description: "Delete client with :id"}
    ]
  });
});

// Show all clients
router.get('/api/clients', function showClients (req, res) {
	res.json({
		message: "Show all clients"
	});
});

// Show new client form
router.get('/api/clients/new', function newClientForm (req, res) {
	res.json({
		message: "Show new client form"
	});
});

// Create a client
router.post('/api/clients', function createClient (req, res) {
	res.json({
		message: "Create a client"
	});
});

// Show client with :id
router.get('/api/clients/:id', function findClient (req, res) {
	res.json({
		message: "Show client with :id"
	});
});

// Edit client with :id
router.get('/api/clients/:id/edit', function editClient (req, res) {
	res.json({
		message: "Edit client with :id"
	});
});

// Update client with :id
router.patch('/api/clients/:id', function updateClient (req, res) {
	res.json({
		message: "Update client with :id"
	});
});

// Show delete form for client with :id
router.get('/api/clients/:id/delete', function deleteClientForm (req, res) {
	res.json({
		message: "Show delete form for a client with :id"
	});
});

// Delete client with :id
router.delete('/api/clients/:id', function deleteClient (req, res) {
	res.json({
		message: "Delete client with :id"
	});
});

module.exports = router;