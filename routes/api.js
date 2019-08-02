const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserAccount = require('../models/useraccount');
const Account = require('../models/account');
const authCheck = require('../middleware/authCheck');
const Transaction = require('../models/transaction');


router.post('/transfer', authCheck, async function(req, res, next){
  const sender = await Account.findOne({accountno: req.body.senderno});
  const receiver = await Account.findOne({accountno: req.body.receiverno});
    console.log(sender+" "+receiver)
  if(sender == null || receiver == null)
  {
    return res.status(400).json({
        error: "One or more of the accounts numbers does not exist!"
    });
  }
  if(sender.accountbalance < req.body.amount)
  {
    return res.status(400).json({
        error: "Sorry you do not sufficient funds!"
    });
  }

  sender.accountbalance = sender.accountbalance - req.body.amount 
  sender.save();
  
  receiver.accountbalance = receiver.accountbalance + req.body.amount 
  receiver.save();

  return res.status(200).json({
    message: "Transfer successfull"
});
})


router.post('/deposit', async function(req, res, next){
    const sender = await Account.findOne({accountno: req.body.senderno});
   
    if(sender == null)
    {
      return res.status(400).json({
          error: "Invalid account number!"
      });
    }

    sender.accountbalance = sender.accountbalance + req.body.deposit 
    sender.save()
    return res.status(200).json({
        message: "Deposit successfull"
    });
    
  })


router.post('/account', async function(req, res, next){
    const account = await Account.create_account(req)
    
    res.status(200).send(account);
    console.log(account)
     });

    router.post("/useraccount", function(req, res, next){
    user.save().then(item => {
      
       
    
          }) 

     })    


 router.post('/signup', async (req, res, next)=>{

    let users = await User.find({email: req.body.email}).exec()
    if (users.length >= 1) {
        return res.status(409).json({
            message: "Email already exists"
        });
    }
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash)=> {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            else{
                const user = new User({
                    email: req.body.email,
                    phonenumber: req.body.phonenumber,
                    trn: req.body.trn,
                    username: req.body.username,
                    password: hash
                });

                try 
                {
                    const usr = await user.save()
                    const acc = await Account.create_account(req)
    
                    let userAccount = new UserAccount()
                    userAccount.userid = usr._id
                    userAccount.accountno = acc._id
                    const usracc = await userAccount.save()

                    res.status(201).json({
                        message: "User Created"
                    });
                    
                    
                } catch (err) 
                {
                    return res.status(400).json({
                        error: err
                    });
                }
               

            }
        });
    }
    console.log(users);
 });

 router.post('/login', function(req, res, next){
     User.find({email: req.body.email})
     .exec()
     .then(user=>{
         if(user.length <1){
             return res.status(401).json({
                 message: 'Authentication failed'
             });
         }
         bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
             if(err) {
                return res.status(401).json({
                    message: 'Authentication failed'
         });
        }
        if (result) {
           const token = jwt.sign(
               {
                email: user[0].email,
                userId: user[0]._id
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                },
            );
            return res.status(200).json({
                message: 'Authentication successful',
                token: token
            });
        }
        res.status(401).json({
            message: 'Authentication failed'
        })
    });
     })
     .catch(err => {
         console.log(err);
        res.status(500).json({
            error: err
        });
 });

 })

module.exports = router;
