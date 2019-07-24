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


AccountSchema.statics.create_account = async function create_account(req){

    const count = await Account.count()
    var accNum = 999;
    let account = new Account(req.body);
    account.accountno = accNum

    if(count > 0)
    {
        const accs = await Account.find().sort({accountno: -1}).limit(1);
        account.accountno = accs[0].accountno
    }

    account.accountno = account.accountno+1
    const acc = await account.save()
    return acc;
}

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;

