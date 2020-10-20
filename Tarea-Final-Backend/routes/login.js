const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const { SEED, TIME_TOKEN } = require('../config/config');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ where: { email: body.email}})
    .then (user => {
        if(!user) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Usuario o Password es incorrecto'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, user.password)) {
            return res.res.status(401).json({
                ok: false,
                err: {
                    message: 'Usuario o Password es incorrecto'
                }
            });
        }

        let token = jwt.sign({ user }, SEED, {expiresIn: TIME_TOKEN});
        res.json({
            ok: true,
            user,
            token
        })
    })
    .catch(err => res.status(401).json({
        ok: false,
        err
    }))
});

module.exports = app;
