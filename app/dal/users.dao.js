const mysql = require('../database/models');

const findUserByEmail = (email) => mysql.users.findOne({
    where: {
        email,
    },
});

module.exports = {
    findUserByEmail,
};
