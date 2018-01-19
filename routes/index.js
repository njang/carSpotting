const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ENV = require('../app-env');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lawnTracker');
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Clients = require('../models/client');

const googleMapsAPIKey = ENV.GOOGLE_MAPS_API;

/**********
 * ROUTES *
 **********/

/* GET home page. */
router.get('/', function homepage (req, res, next) {
  res.render('index', { 
  	title: 'Lawn Tracker',
  	user: User,
  	googleMapsAPIKey: googleMapsAPIKey
  });
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
	Clients.find(function(err, clients) {
    res.json( clients );
  });
});

// Show new client form
router.get('/api/clients/new', function newClientForm (req, res) {
	res.json({
		message: "Show new client form"
	});
});

// Create a new client
router.post('/api/clients', function createClient (req, res) {
	res.json({
		message: "Create a new client"
	});
});

// Show client with :id
router.get('/api/clients/:id', function findClient (req, res) {
  let clientId = req.params.id;
  // res.json( clientId );
  Clients.findOne({ _id: clientId }, function (err, foundClient) {
		res.json( foundClient );
	});
});

// Edit client with :id
router.get('/api/clients/:id/edit', function editClient (req, res) {
  let clientId = req.params.id;
  Clients.findOne({ _id: clientId }, function (err, foundClient) {
    // update the todos's attributes
    foundClient.name = req.body.name;
    foundClient.phone = req.body.phone;
    // foundClient.location = req.body.location;
		foundClient.lawn.lotSize = req.body.lotSize;
    foundClient.lawn.turfType = req.body.turfType;
    foundClient.lawn.lastMowed = req.body.lastMowed;

    // save updated todo in db
    foundClient.save(function (err, savedClient) {
      res.json(savedClient);
    });
  });
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
  let clientId = req.params.id;
  // find todo in db by id and remove
  Client.findOneAndRemove({ _id: clientId }, function (err, deletedClient) {
    res.json(deletedClient);
  });
});

module.exports = router;