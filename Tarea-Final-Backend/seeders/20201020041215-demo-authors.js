'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [{
      name: 'Author 1',
      age: 66,
      nationality: 'americana',
      state: true,
      createdAt:new Date(),
      updatedAt: new Date() 
    }]),
    queryInterface.bulkInsert('Authors', [{
      name: 'Author 2',
      age: 55,
      nationality: 'americana',
      state: true,
      createdAt:new Date(),
      updatedAt: new Date() 
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
