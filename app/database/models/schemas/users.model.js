module.exports = (sequelize, DataTypes) => sequelize.define('users', {
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'name',
    },
    userName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'user_name',
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        field: 'email',
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password',
    },
    salt: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'salt',
    },
    isEmailVerified: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: 'is_email_verified',
    },
    status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '1',
        field: 'status',
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
});

module.exports.initRelations = () => {
};
