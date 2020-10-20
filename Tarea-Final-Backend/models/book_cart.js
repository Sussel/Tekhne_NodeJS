'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_Cart extends Model {
    
    static associate(models) {
      // Book_Cart - Books
      this.belongsTo(models.Book, {
        as: 'books',
        foreignKey: 'bookId'
      }) 

      // Book_Cart - Cart
      this.belongsTo(models.Cart, {
        as: 'cart',
        foreignKey: 'cartId'
      })
    }
  };
  Book_Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Book_Cart',
  });
  return Book_Cart;
};