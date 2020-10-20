const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const app = express();
const { verifyToken, verifyRole } = require("../middlewares/auth");
const Author = require("../models").Author;

// Create new author
app.post("/authors", [verifyToken, verifyRole], (req, res) => {
    let body = req.body;
  
    Author.create({
      name: body.name,
      age: body.age,
      nationality: body.nationality
    })
      .then((author) => {
        res.status(201).json({
          ok: true,
          author,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });

// Get an author by id
app.get("/authors/:authorId", (req, res) => {
    let authorId = req.params.authorId;
  
    Author.findOne({ where: {id: authorId } })
      .then((author) => {
        if(!author) {
              return res.status(404).json({
              ok: false,
              message: 'Author not found'
            })
        }
        return res.json({ ok: true, author });
      })
      .catch((err) => res.status(400).json({ ok: false, err }));
  });



// Get all authors
app.get("/authors", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
      state: true,
    };
  
    Author.findAndCountAll({
      limit: limit,
      offset: from,
      where: defaultFilters,
      attributes: ["id", "name", "age", "nationality", "state"],
    })
      .then(({ count, rows }) => {
        res.json({
          ok: true,
          authors: rows,
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

  // Update Author
app.put("/authors/:authorId", [verifyToken, verifyRole], (req, res) => {
    let authorId = req.params.authorId;
    let body = _.pick(req.body, ["name", "age", "nationality"]);
  
    Author.update(body, {
      where: {
        id: authorId,
      },
    })
      .then((author) =>
        res.json({
          ok: true,
          author,
        })
      )
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });
  
  // Delete Author
  app.delete("/authors/:authorId", [verifyToken, verifyRole], (req, res) => {
    let authorId = req.params.authorId;
    let deleteState = {
      state: false,
    };
    Author.update(deleteState, {
      where: {
        id: authorId,
      },
    })
      .then((author) => {
        if (!author) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Author not found",
            },
          });
        }
        res.status(204).json({
          ok: true,
          author,
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