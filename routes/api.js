const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models/useraccount');
const Account = require('../models/account');


// GET 
router.get('/users', function(req, res, next) {
    // return res.send("working");
    db.Member.find({country_id : 10}).sort({score : -1}).limit(1)
     User.find({}).sort().then(function(users){
        res.send(users)
    });
});

router.post('/account', function(req, res, next){

    Account.count({}, function(err, count){
         var accNum = 999;
        if(count > 0){
         Account.find({}).sort({accountno: -1}).limit(1).then(users => {
               
                let account = new Account(req.body);
                account.accountno = users[0].accountno+1
                account.save();
       
           });
        }
        else
        {
            let account = new Account(req.body);
            account.accountno = accNum+1
            account.save()
            console.log(account)
        } 
        
    });
    // }) .catch(err => {
    //     res.status(400).send(err);
    //   });

        // let user = new Account(req.body);
        // user.save().then(item => {
          
        //     let account = new Account();
         
    
        //   }) 
        //   .catch(err => {
        //     res.status(400).send(err);
        //   });
        // User.create(req.body).then(function(user){
        //  res.send(user);
        // }).catch(next);
        console.log(req.body);
     });
    

  router.post('/createusers', function(req, res, next){

    let user = new Acc(req.body);
    user.save().then(item => {
      
        let userAccount = new UserAccount();
        userAccount.userid = item._id;
        userAccount.email = req.body.email;
        userAccount.password = req.body.password;
        userAccount.save();
        res.send("item saved to database" + userAccount);

      }) 
      .catch(err => {
        res.status(400).send(err);
      });
    // User.create(req.body).then(function(user){
    //  res.send(user);
    // }).catch(next);
    console.log(req.body);
 });

 router.post('/signup', (req, res, next)=>{
     User.find({email: req.body.emil})
     .exec()
     .then(user => {
         if (user.length >= 1) {
             return res.status(409).json({
                 message: "Email already exists"
             });
            } else{
                bcrypt.hash(req.body.password, 10, (err, hash)=> {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            email: req.body.email,
                            phonenumber: req.body.phonenumber,
                            trn: req.body.trn,
                            username: req.body.username,
                            password: hash
                        });
                        user
                        .save()
                        .then (result =>{
                        console.log(result);
                        res.status(201).json({
                            message: "User Created"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });

                    }
                });
            }
     });
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
