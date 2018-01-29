const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Clients = require('../models/client');
const ENV = require('../app-env');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.connect('mongodb://localhost:27017/lawnTracker');

// const db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const googleMapsAPIKey = ENV.GOOGLE_MAPS_API;

/**********
 * ROUTES *
 **********/

// Home page
router.get('/', function homepage (req, res, next){
  res.render('index', {
    title: 'Lawn Tracker',
    user: req.user,
  	googleMapsAPIKey: googleMapsAPIKey
  });
});

// Route for logging out
router.get('/logout', (req, res) => {
  req.session.destroy(function(event){
    req.logout();
    res.redirect('/');
  });
});


// Finish setting up the Sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// -> Google
router.get('/auth/google', 
  passport.authenticate('google', { 
    scope: "email" 
  })
);

// <- Google
router.get('/auth/google/callback',
  passport.authenticate('google', { 
    successRedirect: '/', failureRedirect: '/' 
  })
);  
// Another way to handle return auth from Google
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log(req.user);
//     res.redirect('/');
//   });

/* JSON API Endpoints */
router.get('/api', function api_index (req, res){
  res.json({
    message: "Lawn Tracker App for Lawnsworth",
    documentation_url: "https://github.com/njang/lawnTracker/blob/master/README.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api/clients", description: "Show all clients"},
      // {method: "GET", path: "/api/clients/new", description: "Show new client form"},
      {method: "POST", path: "/api/clients", description: "Create a client"},
      {method: "GET", path: "/api/clients/:id", description: "Show client with :id"},
      // {method: "GET", path: "/api/clients/:id/edit", description: "Edit client with :id"},
      {method: "PATCH", path: "/api/clients/:id", description: "Update client with :id"},
      // {method: "GET", path: "/api/clients/:id/delete", description: "Show delete form for a client with :id"},
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

// // Show new client form
// router.get('/api/clients/new', function newClientForm (req, res) {
// 	res.json({
// 		message: "Show new client form"
// 	});
// });

// Create a new client
router.post('/api/clients', function createClient (req, res) {
  let client = new Clients(req.body);
  client.save((err, createdClient) => {
    if (err) {
        res.status(500).send(err);
    }
    res.status(200).send(createdClient);
  });
  // res.json(client);
});

// Show a client with matching id
router.get('/api/clients/:id', function findClient (req, res) {
  let clientId = req.params.id;
  // res.json( clientId );
  Clients.findOne({ _id: clientId }, function (err, foundClient) {
		res.json( foundClient );
	});
});

// // Edit client with :id
// router.get('/api/clients/:id/edit', function editClient (req, res) {
//   let clientId = req.params.id;


//   Clients.findOne({ _id: clientId }, function (err, foundClient) {
//     console.log(foundClient);
//   //   // update the todos's attributes
//   //   foundClient.name = req.body.name;
//   //   foundClient.phone = req.body.phone;
//   //   // foundClient.location = req.body.location;
// 		// foundClient.lawn.lotSize = req.body.lotSize;
//   //   foundClient.lawn.turfType = req.body.turfType;
//   //   foundClient.lawn.lastMowed = req.body.lastMowed;

//   //   foundClient.save(function (err, savedClient) {
//   //     res.json(savedClient);
//   //   });
//   });
// 	res.json({
// 		message: "Edit client with :id"
// 	});
// });

// Update client with :id
// router.patch('/api/clients/:id', function updateClient (req, res) {
// 	res.json({
// 		message: "Update client with :id"
// 	});
// });
router.put('/api/clients/:id', (request, response) => {
  Clients.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      phone: request.body.phone
    },
    {new: true},
    function(err, model) {
      console.log(model);
      if (err) {
        response.status(500).send(err);
      }
      response.status(200).send(model);
    }
  );
})


// // Show delete form for client with :id
// router.get('/api/clients/:id/delete', function deleteClientForm (req, res) {
// 	res.json({
// 		message: "Show delete form for a client with :id"
// 	});
// });

// Delete client with :id
router.delete('/api/clients/:id', function deleteClient (req, res) {
  let clientId = req.params.id;
  // console.log('deleting id: ', clientId);
  Clients.findOneAndRemove({_id: clientId} , function (err, deletedClient) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(deletedClient);
  });
});

module.exports = router;