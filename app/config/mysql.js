const env = require('../library/env');

env.required([
    'MYSQL_USER_NAME',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'MYSQL_HOST',
]);

const config = {
    [env.get('NODE_ENV', 'development')]: {
        username: env.get('MYSQL_USER_NAME'),
        password: env.get('MYSQL_PASSWORD'),
        database: env.get('MYSQL_DATABASE'),
        host: env.get('MYSQL_HOST'),
        port: env.get('MYSQL_PORT', 3306),
        dialect: env.get('MYSQL_DIALECT', 'mysql'),
        logging: env.get('MYSQL_LOGGING', false, Boolean),
    },

};

module.exports = config;
