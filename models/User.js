const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  type: String,  // kita admin or parent
  kita: {type: Schema.Types.ObjectId, ref: 'Kita'},
  parent: {type: Schema.Types.ObjectId, ref: 'Parent'}
});


const User = mongoose.model('User', userSchema);
module.exports = User;