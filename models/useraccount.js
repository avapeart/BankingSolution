const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserAccountSchema = new Schema({
    userid:{
        type: Schema.Types.ObjectId, ref: 'User',required: true
    },
    accountno:{
        type: Schema.Types.ObjectId, ref: 'Account',required: true
    }
});

var UserAccount = mongoose.model('UserAccount', UserAccountSchema);
module.exports = UserAccount;