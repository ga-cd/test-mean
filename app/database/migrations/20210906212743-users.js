module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {
        userId: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'user_id',
        },
        name: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
            field: 'name',
        },
        userName: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
            field: 'user_name',
        },
        email: {
            type: Sequelize.DataTypes.STRING(254),
            allowNull: false,
            unique: true,
            field: 'email',
        },
        password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'password',
        },
        salt: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'salt',
        },
        isEmailVerified: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: true,
            field: 'is_email_verified',
        },
        status: {
            type: Sequelize.DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '1',
            field: 'status',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Now,
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
        tableName: 'users',
    }),
    down: async (queryInterface) => queryInterface.dropTable('users'),
};
