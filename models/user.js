const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    trn: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    gender:{
        type: Boolean,
    },
    phonenumber:{
      type: Number,
      unique: true,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateofbirth: {
        type: String,
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
