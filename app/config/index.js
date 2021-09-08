const env = require('../library/env');

env.required([
    'SERVER_PORT',
    'JWT_SECRET',
]);
const index = {
    env: env.get('NODE_ENV', 'development'),
    port: env.get('SERVER_PORT', 6000, Number),
    jwtSecret: env.get('JWT_SECRET'),
};

module.exports = index;
