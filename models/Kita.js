const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitaSchema = new Schema({
  kitaName: String, 
  Address: String, 
  Postcode: String, 
  Telephone: String, 
  emailAddress: String, 
  freePlaces: Number, 
  languages: Array, 
  totalPlaces: Number, 
  theme: String, 
  openTime: String, 
  closeTime: String, 
  minAge: Number, 
  maxAge: Number , 
  password: String,
  imageURL: String,
  imagePublicID: String
});

const Kita = mongoose.model('Kita', kitaSchema);
module.exports = Kita;