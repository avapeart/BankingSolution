const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionTypeSchema = new Schema({
    interest: {
        type: Number,
      },
      deposit:{
          type: Number,
      },
      transfer:{
        type: Number,
    }
});

var Transactiontype = mongoose.model('Transactiontype', TransactionTypeSchema);
module.exports = Transactiontype;