/* eslint consistent-return:0 */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');

const userDao = require('../dal/users.dao');
const config = require('../config');

const localLogin = new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    let user = await userDao.findUserByEmail(email);
    if (!user || !await bcrypt.compare(password + user.salt, user.password)) {
        return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
    }
    if (user.status !== 1) {
        return done(null, false, { error: 'User is not active. Please contact support.' });
    }
    user = await user.get({ plain: true });
    done(null, user);
});

const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}, async (payload, done) => {
    const user = payload;
    if (!user) {
        return done(null, false);
    }
    done(null, user);
});

passport.use('jwt', jwtLogin);
passport.use('local', localLogin);

module.exports = passport;
