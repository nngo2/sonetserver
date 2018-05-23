const mongoose = require('mongoose');
const Connection = require('../models/connections');

exports.getFriendList = function(req, res, next){
    Connection.findById(req.params.id)
        .populated({path: 'friends', select: '_id firstName lastName status'})
        .exec((err, con) => {
            if(err) return next(err);
            res.json(con.friends);
        })
}

exports.addFriend = function (req, res, next) {
    const userId = mongoose.Types.ObjectId(req.query.userId);
    const friendId =  mongoose.Types.ObjectId(req.query.friendId);
    Connection.findOneAndUpdate({_id : userId}, {$push : {friends : friendId}},{upsert:true}, (err, updated) => {
        if(err) return next(err);
        res.sendStatus(200);
    });
}