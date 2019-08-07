const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    type: { 
        type: String
    },
    senderno: {
        type: Schema.Types.ObjectId, ref: 'Account', required: true
      },
    receiverno:{
        type: Schema.Types.ObjectId, ref: 'Account'
    },
    amount:{
        type: Number,
    },
    transactiontype:{
        type: String
    },
    timestamp:{
        type: Date,
        default: Date.now
    } 

});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;