const authHelper = require('../helpers/authHelper');

const login = async (req, res) => {
    const { user } = req;
    const token = authHelper.generateToken(user);
    res.json({ user, token });
};

module.exports = {
    login,
};
