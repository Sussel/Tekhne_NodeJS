'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books', // name of Source model
      'authorId', // name of the key,
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Authors'
          },
          key: 'id',
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Books',  // name of table
      'authorId' // column que quiero borrar
      )
  }
};
