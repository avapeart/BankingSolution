const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionTypeSchema = new Schema({
    name: {
        type: String,
    }
});

var Transactiontype = mongoose.model('Transactiontype', TransactionTypeSchema);
module.exports = Transactiontype;