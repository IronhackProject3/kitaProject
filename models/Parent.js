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
  Parent2FName: String,
  Parent2SName: String,
  Parent2Phone: String,
  Parent2Email: String,
  homeLanguage: Array,
  // specialNeeds: Boolean,
  specialNeedsDetails: String,
});

const Parent = mongoose.model('Parent', parentSchema); 
module.exports = Parent;