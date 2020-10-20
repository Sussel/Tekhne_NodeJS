'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'Book 1',
      description: 'Terror',
      price: 300,
      state: true,
      authorId: 1,
      createdAt:new Date(),
      updatedAt: new Date() 
    }]),
    queryInterface.bulkInsert('Books', [{
      title: 'Book 2',
      description: 'Terror',
      price: 100,
      state: true,
      authorId: 2,
      createdAt:new Date(),
      updatedAt: new Date() 
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
