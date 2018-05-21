const verifyJWTToken = require('./auth').verifyJWTToken;

exports.verifyJWT = function (req, res, next) {
    if (req.method.toUpperCase() === 'OPTIONS') {
        next();
    }
    else {
        if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
            verifyJWTToken(req.headers['authorization'])
                .then((decodedToken) => {
                    req.user = decodedToken.data;
                    next();
                })
                .catch((err) => {
                    res.status(401).json({error : { message: 'Invalid auth token provided.' }});
                });
        } else {
            return res.status(401).json({error: { message: 'No token provided!' }});
        }
    }
}