// require mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/lawnTracker");

var Client = require('./client');

module.exports.Client = Client;
