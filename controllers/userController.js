const User = require('../models/user');

exports.getAll = function(req, res, next){
    User.find()
        .sort([['lastName', 'ascending']])
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
