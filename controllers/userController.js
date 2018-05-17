const User = require('../models/user');

exports.getAll = function(req, res, next){
    User.find()
        .sort([['lastName', 'ascending']])
        .exec(function(err, users){
            if(err) return next(err);
            res.json(users);
        });
}
