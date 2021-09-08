module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('upload_jobs', {
        uploadJobId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'upload_job_id',
        },
        fileName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
            field: 'file_name',
        },
        rowsCount: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0,
            field: 'rows_count',
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
        jobStatus: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
            defaultValue: 'pending',
            field: 'job_status',
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
        tableName: 'upload_jobs',
    }).then(() => queryInterface.addConstraint('upload_jobs', {
        type: 'FOREIGN KEY',
        fields: ['user_id'],
        name: 'fkIdx_user_upload_jobs', // useful if using queryInterface.removeConstraint
        references: {
            table: 'users',
            field: 'user_id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
    })),

    down: async (queryInterface) => queryInterface.dropTable('upload_jobs'),
};
