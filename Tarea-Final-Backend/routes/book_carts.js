const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const app = express();
const { verifyToken, verifyRole } = require("../middlewares/auth");
const BookCart = require("../models").Book_Cart;

// Create new book_cart
app.post("/book_carts", verifyToken, (req, res) => {
    let body = req.body;
  
    BookCart.create({
      quantity: body.quantity,      
      bookId: body.bookId,
      cartId: body.cartId
    })
      .then((book_cart) => {
        res.status(201).json({
          ok: true,
          book_cart,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });

// Get an book_cart by id
app.get("/book_carts/:book_cartId",verifyToken, (req, res) => {
    let book_cartId = req.params.book_cartId;
  
    BookCart.findOne({ where: {id: book_cartId } })
      .then((book_cart) => {
        if(!book_cart) {
              return res.status(404).json({
              ok: false,
              message: 'Book_Cart not found'
            })
        }
        return res.json({ ok: true, book_cart });
      })
      .catch((err) => res.status(400).json({ ok: false, err }));
  });



// Get all book_carts
app.get("/book_carts",verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
      state: true,
    };
  
    BookCart.findAndCountAll({
      limit: limit,
      offset: from,
      where: defaultFilters,
      attributes: ["id", "quantity", "state", "bookId", "cartId"],
    })
      .then(({ count, rows }) => {
        res.json({
          ok: true,
          book_carts: rows,
          total: count,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          message: err,
        })
      );
  });

  // Update Book_Cart
app.put("/book_carts/:book_cartId", verifyToken, (req, res) => {
    let book_cartId = req.params.book_cartId;
    let body = _.pick(req.body, ["quantity"]);
  
    BookCart.update(body, {
      where: {
        id: book_cartId,
      },
    })
      .then((book_cart) =>
        res.json({
          ok: true,
          book_cart,
        })
      )
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });
  
  // Delete Book_Cart
  app.delete("/book_carts/:book_cartId", verifyToken, (req, res) => {
    let book_cartId = req.params.book_cartId;
    let deleteState = {
      state: false,
    };
    BookCart.update(deleteState, {
      where: {
        id: book_cartId,
      },
    })
      .then((book_cart) => {
        if (!book_cart) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Book_Cart not found",
            },
          });
        }
        res.status(204).json({
          ok: true,
          book_cart,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          message: err,
        })
      );
  });
  
  module.exports = app;