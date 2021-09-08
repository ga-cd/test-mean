module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('invoices', {
        invoiceId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'invoice_id',
        },
        invoiceInternalId: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'invoice_internal_id',
        },
        amount: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            field: 'amount',
        },
        dueOn: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true,
            field: 'due_on',
        },
        sellPrice: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            field: 'sell_price',
        },
        isValidRow: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '1',
            field: 'is_valid_row',
        },
        uploadJobId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'upload_jobs',
                key: 'upload_job_id',
            },
            field: 'upload_job_id',
        },
        userId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id',
            },
            field: 'user_id',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'updated_at',
        },
        deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
        },
    }, {
        tableName: 'invoices',
    }).then(() => queryInterface.addConstraint('invoices', {
        type: 'FOREIGN KEY',
        fields: ['user_id'],
        name: 'fkIdx_user_invoices', // useful if using queryInterface.removeConstraint
        references: {
            table: 'users',
            field: 'user_id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
    })).then(() => queryInterface.addConstraint('invoices', {
        type: 'FOREIGN KEY',
        fields: ['upload_job_id'],
        name: 'fkIdx_upload_job_invoices', // useful if using queryInterface.removeConstraint
        references: {
            table: 'upload_jobs',
            field: 'upload_job_id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
    })),

    down: async (queryInterface) => queryInterface.dropTable('invoices'),
};
