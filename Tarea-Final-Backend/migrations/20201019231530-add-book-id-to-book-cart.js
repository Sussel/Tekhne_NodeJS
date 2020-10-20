'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Book_Carts', // name of Source model
      'bookId', // name of the key,
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Books'
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
      'Book_Carts',  // name of table
      'bookId' // column que quiero borrar
      )
  }
};
