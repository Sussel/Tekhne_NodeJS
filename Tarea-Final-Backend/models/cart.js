'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      // Cart - Book_Cart
      this.hasMany(models.Book_Cart, {
        as: 'book_cart',
        foreignKey: 'id'
      })
    }
  };
  Cart.init({
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};