const mongoose = require('mongoose');
const Connection = require('../models/connections');

exports.getFriendList = function(req, res, next){
    console.log('getting friends of user: ' + req.params.id);
    Connection.findById(mongoose.Types.ObjectId(req.params.id))
        .populate({path: 'friends', select: '_id firstName lastName status'})
        .exec((err, con) => {
            if(err) {
                return next(err);
            };
            if(con){
                res.json(con.friends);
            }else{
                res.sendStatus(200);
            }
        })
}

exports.addFriend = function (req, res, next) {
    const userId = mongoose.Types.ObjectId(req.query.userId);
    const friendId =  mongoose.Types.ObjectId(req.query.friendId);
    Connection.findOneAndUpdate({_id : userId}, {$push : {friends : friendId}},{upsert:true}, (err, updated) => {
        if(err) return next(err);
        Connection.findOneAndUpdate({_id : friendId}, {$push : {friends : userId}},{upsert:true}, (err, updated) => {
            if(err) return next(err);
            res.sendStatus(200);
        });
    });
}