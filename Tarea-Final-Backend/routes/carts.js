const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const app = express();
const { verifyToken, verifyRole } = require("../middlewares/auth");
const Cart = require("../models").Cart;

// Create new cart
app.post("/carts", verifyToken, (req, res) => {
    let body = req.body;
  
    Cart.create({
      nit: body.nit,
      name: body.name
    })
      .then((cart) => {
        res.status(201).json({
          ok: true,
          cart,
        });
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });

// Get a cart by id
app.get("/carts/:cartId", verifyToken, (req, res) => {
    let cartId = req.params.cartId;
  
    Cart.findOne({ where: {id: cartId } })
      .then((cart) => {
        if(!cart) {
              return res.status(404).json({
              ok: false,
              message: 'Cart not found'
            })
        }
        return res.json({ ok: true, cart });
      })
      .catch((err) => res.status(400).json({ ok: false, err }));
  });



// Get all carts
app.get("/carts", verifyToken, (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let defaultFilters = {
      state: true,
    };
  
    Cart.findAndCountAll({
      limit: limit,
      offset: from,
      where: defaultFilters,
      attributes: ["id", "nit", "name", "state"],
    })
      .then(({ count, rows }) => {
        res.json({
          ok: true,
          carts: rows,
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

  // Update Cart
app.put("/carts/:cartId", verifyToken, (req, res) => {
    let cartId = req.params.cartId;
    let body = _.pick(req.body, ["nit", "name"]);
  
    Cart.update(body, {
      where: {
        id: cartId,
      },
    })
      .then((cart) =>
        res.json({
          ok: true,
          cart,
        })
      )
      .catch((err) =>
        res.status(400).json({
          ok: false,
          err,
        })
      );
  });
  
  // Delete Cart
  app.delete("/carts/:cartId", verifyToken, (req, res) => {
    let cartId = req.params.cartId;
    let deleteState = {
      state: false,
    };
    Cart.update(deleteState, {
      where: {
        id: cartId,
      },
    })
      .then((cart) => {
        if (!cart) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Cart not found",
            },
          });
        }
        res.status(204).json({
          ok: true,
          cart,
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