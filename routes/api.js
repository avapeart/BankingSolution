const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserAccount = require('../models/useraccount');
const Account = require('../models/account');
const authCheck = require('../middleware/authCheck');
const transactiontype = require('../models/transactiontype');


router.post('/transactiontype', function(req, res, next){
    account.find({accountbalance: req.body.accountbalance});
    transactiontype.find({transactionamount: req.body.transactionamount});
    transactiontype.find({deposit: req.body.deposit})
    .exec()
    .then(transactiontype => {
    if(transactiontype == deposit){
        accountbalance += transactionamount;
        return res.status(2002).json({
            message: "Account has been updated" + accountbalance
        });
    }else if(transactiontype == transfer){
        accountbalance -= transactionamount;
        return res.status(2003).json({
            message: "Transfer sent. Your current balance is: "  + accountbalance
        });
    };
})
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
