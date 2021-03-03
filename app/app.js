const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();

app.set('view engine', 'pug');
app.set('views', './app/views');

// app.use(express.static('public'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

module.exports = app;