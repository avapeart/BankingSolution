const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = express();

//listen for requests
api.listen(process.env.port || 4000, function(){
    console.log('Ready for requests');
})

mongoose.connect('mongodb://localhost/bankingdb');
mongoose.Promise = global.Promise;

api.use(express.static('public'));


api.use(bodyParser.json())

api.use('/api', require('./routes/api'));

api.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

//listen for requests 
api.listen(process.env.port||4003, function(){
    console.log('Ready for requests');
})