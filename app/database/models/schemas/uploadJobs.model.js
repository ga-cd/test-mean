module.exports = (sequelize, DataTypes) => sequelize.define('upload_jobs', {
    uploadJobId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'upload_job_id',
    },
    fileName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'file_name',
    },
    rowsCount: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        field: 'rows_count',
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
    jobStatus: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: 'pending',
        field: 'job_status',
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
    tableName: 'upload_jobs',
    timestamps: true,
    underscored: true,
});

module.exports.initRelations = () => {
    // eslint-disable-next-line global-require
    const model = require('../index');
    const { uploadJobs, users } = model;

    users.hasMany(uploadJobs, {
        as: 'userUploadJobs',
        foreignKey: 'userId',
    });
};
