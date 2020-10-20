const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./users'));
app.use(require('./authors'));
app.use(require('./books'));
app.use(require('./carts'));
app.use(require('./book_carts'));


module.exports = app;