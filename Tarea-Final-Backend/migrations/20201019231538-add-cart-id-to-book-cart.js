'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Book_Carts', // name of Source model
      'cartId', // name of the key,
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Carts'
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
      'cartId' // column que quiero borrar
      )
  }
};
