const mongoose = require('mongoose');
const Schema = mongoose.Schema

const parentSchema = new Schema({
  childFName: String,
  childSName: String,
  dob: Date,
  boyGirl: String,
  Parent1FName: String,
  Parent1SName: String,
  Parent1Phone: String,
  Parent1Email: String,
  ParentAddress: String,
  ParentPostcode: String,
  // kitaId: String,
  applications:  [{
    kitaId : String,
    date: { type: Date, default: Date.now },
    kitaPriority: Number,
    parentPriority: Number
  }],
  homeLanguage: Array,
});

const Parent = mongoose.model('Parent', parentSchema); 
module.exports = Parent;