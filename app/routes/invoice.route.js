const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const invoiceCtrl = require('../controllers/invoice.controller');

const router = express.Router();

router.post('/bulk', upload.single('invoices'), invoiceCtrl.bulkUpload);
router.get('/jobs', invoiceCtrl.getUploadJobsController);
router.get('/:jobId', invoiceCtrl.getInvoicesController);

module.exports = router;
