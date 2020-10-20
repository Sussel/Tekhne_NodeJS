const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

const { verifyToken, verifyRole } = require("../middlewares/auth");

const User = require("../models").User;

/**
 * GET => Leer Informacion
 * POST => Crear Informacion
 * PUT => Actualizar Informacion
 * DELETE => Eliminar Informacion
 */

// Get all users
app.get("/users", [verifyToken, verifyRole], (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);
  let limit = req.query.limit || 5;
  limit = Number(limit);
  let defaultFilters = {
    state: true,
  };

  User.findAndCountAll({
    limit: limit,
    offset: from,
    where: defaultFilters,
    attributes: ["id", "name", "email", "role"],
  })
    .then(({ count, rows }) => {
      res.json({
        ok: true,
        users: rows,
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

// Get a user by id
app.get("/users/:userId", verifyToken, (req, res) => {
  let userId = req.params.userId;

  User.findOne({ where: {id: userId } })
    .then((user) => {
      if(!user) {
        	return res.status(404).json({
            ok: false,
            message: 'User not found'
          })
      }
      return res.json({ ok: true, user });
    })
    .catch((err) => res.status(400).json({ ok: false, err }));
});

// Create new user
app.post("/users", (req, res) => {
  let body = req.body;

  User.create({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  })
    .then((user) => {
      res.status(201).json({
        ok: true,
        user,
      });
    })
    .catch((err) =>
      res.status(400).json({
        ok: false,
        err,
      })
    );
});

// Update User
app.put("/users/:userId", verifyToken, (req, res) => {
  let userId = req.params.userId;
  let body = _.pick(req.body, ["name", "email", "role"]);

  User.update(body, {
    where: {
      id: userId,
    },
  })
    .then((user) =>
      res.json({
        ok: true,
        user,
      })
    )
    .catch((err) =>
      res.status(400).json({
        ok: false,
        err,
      })
    );
});

// Delete user
app.delete("/users/:userId", [verifyToken, verifyRole], (req, res) => {
  let userId = req.params.userId;
  let deleteState = {
    state: false,
  };
  User.update(deleteState, {
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "User not found",
          },
        });
      }
      res.status(204).json({
        ok: true,
        user,
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
