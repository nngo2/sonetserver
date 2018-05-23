const mongoose = require('mongoose');
const User = require('../models/user');

exports.findUsers = function(req, res, next){
    const searchQuery = req.query.searchStr;
    const first = Number(req.query.first);
    const limit = Number(req.query.limit);
    User.find()
        .or([{firstName: { "$regex": searchQuery}}, {lastName: { "$regex":searchQuery}}])
        .select('_id firstName lastName status')
        .sort([['lastName', 'ascending']])
        .skip(first)
        .limit(limit)
        .exec(function(err, users){
            if(err) return next(err);
            res.json(users);
        });
}

exports.findByEmail = function(req, res, next){
    User.findOne({email: req.params.email})
        .exec(function(err, data){
            if(err) return next(err);
            res.json(data);
        });
}

exports.findByLogin = function(req, res, next){
    User.findOne({login: req.params.login})
        .exec(function(err, data){
            if(err) return next(err);
            res.json(data);
        });
}

exports.createUser = function(req, res, next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });

    user.save().then(function(data){
        res.json(data);
    }).catch(function(err){
        if(err) return next(err);
    });
};


exports.getOnlineUsers = function(req, res, next){
           User.find({"status.isOnline": true},'_id firstName lastName',  function(err, data){
                   if(err)  return next(err);
                   res.json(data);
               });
};

exports.addUserSocket = function(data){
    return new Promise(async (resolve, reject) => {
        var id = mongoose.Types.ObjectId(data.userId);
        var user = new User({
            _id: id,
            status: { isOnline: true, socketId: data.socketId}
        });
        try {
            User.findByIdAndUpdate({_id: id}, user, {new: true}, function(err, result){
                if(err) return reject(err);
                resolve(result);
            });
        }
        catch (err) {
            reject(err);
        }
    });
};

exports.disConnectUser = function(data){
    return new Promise(async (resolve, reject) => {
        var id = mongoose.Types.ObjectId(data.userId);
        var user = new User({
            _id: id,
            status: { isOnline: false, socketId: null}
        });
        try {
            User.findByIdAndUpdate({_id: id}, user, {new: true}, function(err, result){
                if(err) return reject(err);
                resolve(result);
            });
        }
        catch (err) {
            reject(err);
        }
    });
};

exports.disConnectSocket = function(socketId){
    return new Promise(async (resolve, reject) => {
        try {
            User.findOneAndUpdate({"status.socketId": socketId}, { status: { isOnline: false, socketId: null}}, {new: true}, function(err, result){
                if(err) return reject(err);
                resolve(result);
            });
        }
        catch (err) {
            reject(err);
        }
    });
};


exports.getUserSocketId = function(socketId){
    return new Promise(async (resolve, reject) =>{
        User.findById({_id: socketId},'status.socketId',  function(err, data){
            if(err)  reject(err);
            resolve(data);
        });
    })
};

exports.updateUser = function(req, res, next){
    var id = mongoose.Types.ObjectId(req.body.id);

    var user = new User({
        _id: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    if (req.body.password) {
        user.password = User.encryptPassword(req.body.password);
    }

    User.findByIdAndUpdate({_id: id}, user, {new: true}, function(err, data){
        if(err) return next(err);
        res.json(data);
    });
};
