const dayjs = require('dayjs');

const validateInvoiceData = (rowData, jobId, userId) => {
    const dueOn = dayjs(rowData.due_on);
    const result = {
        dueOn: rowData.due_on,
        invoiceInternalId: rowData.id,
        amount: rowData.invoice_amount,
        uploadJobId: jobId,
        userId,
    };
    if (
        !dueOn.isValid()
        // eslint-disable-next-line no-restricted-globals
        || isNaN(+rowData.invoice_amount)
        || rowData.id === ''
    ) {
        result.isValidRow = 0;
    }
    const difference = dueOn.diff(dayjs(), 'days');
    const multiplier = {
        greaterThan30: 0.5,
        lessThanOrEqual30: 0.3,
    };
    if (difference > 30) {
        result.sellPrice = +rowData.invoice_amount * multiplier.greaterThan30;
    } else {
        result.sellPrice = +rowData.invoice_amount * multiplier.lessThanOrEqual30;
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(result.amount)) {
        result.amount = -1;
        result.sellPrice = -1;
    }
    return result;
};

module.exports = {
    validateInvoiceData,
};
