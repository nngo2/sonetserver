const User = require('../models/user');
const createJWToken = require('../libs/auth').createJWToken;

exports.login = function(req, res, next){
    const login = req.body.login;
    const password = User.encryptPassword(req.body.password);

    User.findOne({login: login, password: password})
        .exec(function(err, data){
            if(err) return next(err);
            if (!data) {
                res.status(401).json({
                    message: err || "Invalid login"
                });
            } else {
                data.password = '';
                res.status(200).json({
                    success: true,
                    user: data,
                    token: createJWToken({ sessionData: data, maxAge: 3600 })
                });
            }
        });
}

