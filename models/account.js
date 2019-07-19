const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    type: { 
        type: String
    },
    accountno: {
        type: Number,
        unique: true,
        required: [true, 'You must enter your account number'],
        trim: true
      },
      accountbalance:{
          type: Number,
      }
});

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
