const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    type: { 
        type: String
    },
    accountno: {
        type: Schema.Types.ObjectId, ref: 'Account',required: true
      },
    recipientaccountnumber:{
        type: Number,
    },
    transactionamount:{
        type: Number,

    },
    transactiontype:{
        type: Schema.Types.ObjectId, ref: 'Transactiontype',required: true
    } 
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;