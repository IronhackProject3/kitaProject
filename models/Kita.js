const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitaSchema = new Schema({
  kitaName: String, 
  Address: String, 
  Postcode: String, 
  Telephone: String, 
  emailAddress: String, 
  freePlaces: Number, 
  mapLink: String, 
  languages: Array, 
  totalPlaces: Number, 
  theme: String, 
  openTime: String, 
  closeTime: String, 
  minAge: Number, 
  maxAge: Number , 
  password: String,
  // owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Kita = mongoose.model('Kita', kitaSchema);
module.exports = Kita;