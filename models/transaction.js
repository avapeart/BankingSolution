const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    type: { 
        type: String
    },
    accountno: {
        type: Schema.Types.ObjectId, ref: 'Account',required: true
      },
      debit:{
          type: Number,
      },
      
      credit:{
        type: Number,
    },
    recipientaccountnumber:{
        type: Number,
    },

    transactiontype:{
        type: Schema.Types.ObjectId, ref: 'Transactiontype',required: true
    } 
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;