const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const app = express();
const { verifyToken, verifyRole } = require("../middlewares/auth");
const Book = require("../models").Book;

// Create new book
app.post("/books", [verifyToken, verifyRole], (req, res) => {
    let body = req.body;
  
    Book.create({
      title: body.title,
      description: body.description,
      price: body.price,
      authorId: body.authorId
    })
      .then((book) => {
        res.status(201).json({
          ok: true,
          book,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });

// Get an book by id
app.get("/books/:bookId", (req, res) => {
    let bookId1 = req.params.bookId;
  
    Book.findOne({ where: {id: bookId1 } })
      .then((book) => {
        if(!book) {
              return res.status(404).json({
              ok: false,
              message: 'Book not found'
            })
        }
        return res.json({ ok: true, book });
      })
      .catch((err) => res.status(400).json({ ok: false, err }));
  });



// Get all books
app.get("/books", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
      state: true,
    };
  
    Book.findAndCountAll({
      limit: limit,
      offset: from,
      where: defaultFilters,
      attributes: ["id", "title", "description", "price", "state", "authorId"],
    })
      .then(({ count, rows }) => {
        res.json({
          ok: true,
          books: rows,
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

  // Update Book
app.put("/books/:bookId", [verifyToken, verifyRole], (req, res) => {
    let bookId = req.params.bookId;
    let body = _.pick(req.body, ["title", "description", "price"]);
  
    Book.update(body, {
      where: {
        id: bookId,
      },
    })
      .then((book) =>
        res.json({
          ok: true,
          book,
        })
      )
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });
  
  // Delete Book
  app.delete("/books/:bookId", [verifyToken, verifyRole], (req, res) => {
    let bookId = req.params.bookId;
    let deleteState = {
      state: false,
    };
    Book.update(deleteState, {
      where: {
        id: bookId,
      },
    })
      .then((book) => {
        if (!book) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Book not found",
            },
          });
        }
        res.status(204).json({
          ok: true,
          book,
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