const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config');

const generateToken = (user) => {
    const {
        password, salt, ...userInfo
    } = user;
    return jwt.sign(userInfo, config.jwtSecret);
};

const jwtAuthHandler = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (info, user, error) => {
        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }
        if (!user) {
            res.status(401).json({ error: info.message });
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};

const localAuthHandler = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (!user) {
            res.status(401).json(info);
            return;
        }
        const { password, salt, ...userInfo } = user;
        req.user = userInfo;
        next(error, user, info);
    })(req, res, next);
};

module.exports = {
    generateToken,
    jwtAuthHandler,
    localAuthHandler,
};
