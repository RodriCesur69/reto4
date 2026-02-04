var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var layouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secreto-reto-4',
    resave: false,
    saveUninitialized: true
}));

app.use('/', indexRouter);

app.listen(3001, () => console.log("Servidor en http://localhost:3001"));

module.exports = app;