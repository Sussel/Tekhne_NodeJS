'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Ana Torres',
      email: 'ana-admin@sample.com',
      password: '$2b$10$PGqEURL55adfyXShqFRL0.qyXwCDWVd9sUp9hcJOtYUMhtA72J2Bq',
      role: 'ADMIN_ROLE',
      state: true,
      createdAt:new Date(),
      updatedAt: new Date() 
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
