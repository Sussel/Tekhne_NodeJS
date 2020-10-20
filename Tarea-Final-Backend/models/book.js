'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
  
    static associate(models) {
      // Book - Book_Cart
      this.hasMany(models.Book_Cart, {
        as: 'book_carts',
        foreignKey: 'id'
      })

      // Book - Author
      this.belongsTo(models.Book_Cart, {
        as: 'authors',
        foreignKey: 'authorId'
      })
    }

  };

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }    
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};