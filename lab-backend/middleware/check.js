const User = require('../models/User');

const check = async (req, res, next) => {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        return next()
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Token' || !token) {
        return next()
    }
    const user = await User.findOne({token});
    if (!user) {
        return next()
    }
    req.user = user;
    next();
};

module.exports = check;
