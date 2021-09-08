module.exports = (sequelize, DataTypes) => sequelize.define('invoices', {
    invoiceId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'invoice_id',
    },
    invoiceInternalId: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'invoice_internal_id',
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'amount',
    },
    dueOn: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'due_on',
    },
    sellPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'sell_price',
    },
    isValidRow: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '1',
        field: 'is_valid_row',
    },
    uploadJobId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'upload_jobs',
            key: 'upload_job_id',
        },
        field: 'upload_job_id',
    },
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
        field: 'user_id',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
}, {
    tableName: 'invoices',
    timestamps: true,
    underscored: true,
});

module.exports.initRelations = () => {
    // eslint-disable-next-line global-require
    const model = require('../index');
    const { uploadJobs, users, invoices } = model;

    uploadJobs.hasMany(invoices, {
        as: 'uploadJobInvoices',
        foreignKey: 'uploadJobId',
    });
    users.hasMany(invoices, {
        as: 'userInvoices',
        foreignKey: 'userId',
    });
};
