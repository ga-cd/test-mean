const mysql = require('../database/models');

const createInvoicesBulk = (invoices) => mysql.invoices.bulkCreate(invoices);
const getInvoices = (jobId, userId, offset, limit) => mysql.invoices.findAndCountAll({
    where: {
        uploadJobId: jobId,
        userId,
    },
    offset,
    limit,
    raw: true,
});

module.exports = {
    createInvoicesBulk,
    getInvoices,
};
