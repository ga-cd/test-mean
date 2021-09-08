module.exports = {
    up: async (queryInterface) => queryInterface.bulkInsert('users', [{
        user_id: 1,
        name: 'John Doe',
        user_name: 'jdoe',
        email: 'jdoe@email.com',
        password: '$2a$10$ayS9BiuSQVF9S.nxXcc0HO1o/4FHcgIo6nNGImRERSgXYHg9UECbS',
        salt: 'random_salt',
        is_email_verified: 1,
        created_at: new Date(),
    }]),

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users',
            { userId: { [queryInterface.sequelize.Op.in]: [1] } }, {});
    },
};
