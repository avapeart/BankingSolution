const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const AccountTypeSchema = new Schema({
    checkings: {
        type: String,
    },
    savings: {
        type: Number,
    }
});

var AccountType = mongoose.model('AccountType', AccountTypeSchema);
module.exports = AccountType;