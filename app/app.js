/* eslint no-console: 0 */
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const listEndpoints = require('express-list-endpoints');

const config = require('./config');
const mysqlConfig = require('./config/mysql');
const sequelize = require('./library/sequelize')(mysqlConfig[config.env]);
require('./database/models').init(sequelize);

const indexRouter = require('./routes/index');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(compress());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
const passport = require('./library/passport');

app.use(passport.initialize());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ err });
});

console.info('Endpoints: \n', listEndpoints(app));

module.exports = app;
