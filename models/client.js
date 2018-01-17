// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: String,
  address: String,
  phone: Number,
  lotSize: Number,
  turfType: String,
  lastMowed: Number
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
