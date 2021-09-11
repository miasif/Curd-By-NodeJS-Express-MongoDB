const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender:String,
  status:String
});

module.exports = mongoose.model('User', UserSchema);
