const mongoose = require('mongoose');
const Message = require('../models/message');

exports.getMessages = function(req, res, next){
    var fromUserId = req.params.fromUserId;
    var toUserId = req.params.toUserId;
    Message.find()
        .or([{fromUserId: fromUserId, toUserId: toUserId}, {fromUserId: toUserId, toUserId: fromUserId}])
        .sort([['time', 'ascending']])
        .exec(function(err, posts){
            if(err) return next(err);
            res.json(posts);
        });
}

exports.addMessage = function(req, res, next){
    var message = new Message({
        fromUserId: req.body.fromUserId,
        toUserId: req.body.toUserId,
        message: req.body.message,
        time: req.body.time
    });
    message.save().then(function(data){
        res.json(data);
    }).catch(function(err){
        if(err) return next(err);
    });
}