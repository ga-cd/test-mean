/* eslint no-use-before-define: 0 */
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const { validateInvoiceData } = require('../helpers/invoiceHelper');
const { createUploadJob, getUploadJobs } = require('../dal/uploadJobs.dao');
const { createInvoicesBulk, getInvoices } = require('../dal/invoices.dao');

const bulkUpload = async (req, res) => {
    const { userId } = req.user;
    const uploadJobRaw = await createUploadJob({
        userId: req.user.userId,
        fileName: req.file.originalname,
    });
    const { uploadJobId } = await uploadJobRaw.get({ plain: true });
    const invoices = [];
    fs.createReadStream(path.resolve(req.file.path))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => console.error(error))
        .on('data', async (row) => {
            invoices.push(validateInvoiceData(row, uploadJobId, userId));
        })
        .on('end', (rowCount) => fs.unlink(req.file.path, async (err) => {
            if (err) {
                console.error(err);
            }
            await bulkInsertInvoices(invoices);
            uploadJobRaw.update({ rowsCount: rowCount, jobStatus: 'completed' });
            console.log(`Total rows added are : ${rowCount}`);
        }));
    res.status(200).send({ message: 'file uploaded successfully' });
};

const getUploadJobsController = async (req, res) => {
    const { limit, offset } = req.pagination;
    const { userId } = req.user;
    const jobs = await getUploadJobs(userId, offset, limit);
    res.status(200).json({
        message: 'success',
        jobs,
    });
};

const getInvoicesController = async (req, res) => {
    const { limit, offset } = req.pagination;
    const { userId } = req.user;
    const { jobId } = req.params;
    const invoices = await getInvoices(jobId, userId, offset, limit);
    res.status(200).json({
        message: 'success',
        invoices,
    });
};
const bulkInsertInvoices = async (invoices) => {
    await createInvoicesBulk(invoices);
};

module.exports = {
    bulkUpload,
    getUploadJobsController,
    getInvoicesController,
};
