const mongoose = require('mongoose');
const Schema = mongoose.Schema
const parentSchema = new Schema({
  childFName: String,
  childSName: String,
  dob: Date,
  Parent1FName: String
  // kita: {type: Schema.Types.ObjectId, ref: 'Kita'}, //Kita here means 
  // parent: {type: Schema.Types.ObjectId, ref: 'Parent'}
});

const Parent = mongoose.model('Parent', parentSchema); 
module.exports = Parent;