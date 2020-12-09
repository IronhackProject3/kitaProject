const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitaSchema = new Schema({
  kitaName: String, 
  Address : String, 
  Postcode : Number, 
  Telephone: String, 
  emailAddress : String, 
  freePlaces : Number, 
  mapLink : String, 
  languages : Array, 
  totalPlaces : Number, 
  theme : String, 
  openTime: Date, 
  closeTime: Date, 
  minAge : Number, 
  maxAge : Number , 
  password : String
});

const Kita = mongoose.model('Kita', kitaSchema);
module.exports = Kita;