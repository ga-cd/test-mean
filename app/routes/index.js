const express = require('express');
const authRoutes = require('./auth.route');
const invoiceRoutes = require('./invoice.route');
const { jwtAuthHandler, localAuthHandler } = require('../helpers/authHelper');
const pagination = require('../middlewares/pagination');

const router = express.Router();

router.use(pagination);
router.get('/health-check', (req, res, next) => {
    res.status(200).send({
        hello: 'world!',
    });
});
router.use((req, res, next) => {
    if (req.originalUrl.includes('login')) {
        localAuthHandler(req, res, next);
    } else {
        jwtAuthHandler(req, res, next);
    }
});
router.use('/auth', authRoutes);
router.use('/invoice', invoiceRoutes);

module.exports = router;
