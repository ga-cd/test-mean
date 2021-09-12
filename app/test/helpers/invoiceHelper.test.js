require('dotenv').config();
const dayjs = require('dayjs');
const { validateInvoiceData } = require('../../helpers/invoiceHelper');

describe('Invoice helper', () => {
    describe('validateInvoiceData', () => {
        const jobId = 6;
        const userId = 1;
        it('should validate invoice row data', () => {
            const row = {
                id: 'random-invoice-id',
                invoice_amount: '2345.00',
                due_on: '2020-09-26',
            };
            const validatedData = validateInvoiceData(row, jobId, userId);
            expect(validatedData.invoiceInternalId).toEqual(row.id);
            expect(validatedData.amount).toEqual(row.invoice_amount);
            expect(validatedData.dueOn).toEqual(row.due_on);
            expect(validatedData.uploadJobId).toEqual(jobId);
            expect(validatedData.userId).toEqual(userId);
            expect(validatedData.isValidRow).toEqual(1);
        });
        it('should validate invoice row data > invalid date', () => {
            const row = {
                id: 'random-invoice-id',
                invoice_amount: '2345.00',
                due_on: '2020-09-26sdsd',
            };
            const validatedData = validateInvoiceData(row, jobId, userId);
            expect(validatedData.invoiceInternalId).toEqual(row.id);
            expect(validatedData.amount).toEqual(row.invoice_amount);
            expect(validatedData.dueOn).toEqual(row.due_on);
            expect(validatedData.uploadJobId).toEqual(jobId);
            expect(validatedData.userId).toEqual(userId);
            expect(validatedData.isValidRow).toEqual(0);
        });
        it('should validate invoice row data > invalid amount', () => {
            const row = {
                id: 'random-invoice-id',
                invoice_amount: 'asdsa',
                due_on: '2020-09-26',
            };
            const validatedData = validateInvoiceData(row, jobId, userId);
            expect(validatedData.invoiceInternalId).toEqual(row.id);
            expect(validatedData.amount).toEqual(-1);
            expect(validatedData.dueOn).toEqual(row.due_on);
            expect(validatedData.uploadJobId).toEqual(jobId);
            expect(validatedData.userId).toEqual(userId);
            expect(validatedData.isValidRow).toEqual(0);
        });
        it('should validate invoice row data > due on grater than 30 days', () => {
            const row = {
                id: 'random-invoice-id',
                invoice_amount: '2345.0',
                due_on: new dayjs().add(35, 'day'),
            };
            const validatedData = validateInvoiceData(row, jobId, userId);
            expect(validatedData.invoiceInternalId).toEqual(row.id);
            expect(validatedData.amount).toEqual(row.invoice_amount);
            expect(validatedData.dueOn).toEqual(row.due_on);
            expect(validatedData.uploadJobId).toEqual(jobId);
            expect(validatedData.userId).toEqual(userId);
            expect(validatedData.isValidRow).toEqual(1);
            expect(validatedData.sellPrice).toEqual(+row.invoice_amount * 0.50);
        });
        it('should validate invoice row data > due on less than 30 days', () => {
            const row = {
                id: 'random-invoice-id',
                invoice_amount: '2345.0',
                due_on: new dayjs().add(15, 'day'),
            };
            const validatedData = validateInvoiceData(row, jobId, userId);
            expect(validatedData.invoiceInternalId).toEqual(row.id);
            expect(validatedData.amount).toEqual(row.invoice_amount);
            expect(validatedData.dueOn).toEqual(row.due_on);
            expect(validatedData.uploadJobId).toEqual(jobId);
            expect(validatedData.userId).toEqual(userId);
            expect(validatedData.isValidRow).toEqual(1);
            expect(validatedData.sellPrice).toEqual(+row.invoice_amount * 0.30);
        });
    });
});
