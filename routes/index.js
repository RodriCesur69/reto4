var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var Database = require('../data/database');
const UsuarioDAO = require("../data/usuario-dao");
const JuegoDAO = require('../data/juego-dao');

var db = Database.getInstance("videojuegos.db");
var usuarioDao = new UsuarioDAO(db);
var juegoDao = new JuegoDAO(db);

// Pagina de inicio
router.get('/', function(req, res) {
  res.render('index', { title: 'Gestión de Videojuegos' });
});

// Ruta para mostrar el formulario de login
router.get('/login', function(req, res) {
  res.render('login', { error: null });
});

// Procesa el formulario de login
router.post('/login', function(req, res) {
  const usuario = usuarioDao.findUserByEmail(req.body.email);
  
  if(usuario && req.body.password === usuario.password){
    req.session.user = { email: usuario.email, id: usuario.id };
    res.redirect("/coleccion");
  } else {
    res.render('login', { error: 'Datos incorrectos' });
  }
});

// Muestra la lista de juegos
router.get('/coleccion', authMiddleware, function(req, res) {
  const filtros = {
      plataforma: req.query.plataforma,
      genero: req.query.genero,
      estado: req.query.estado
  };
  
  let misJuegos = juegoDao.findJuegosByUserId(req.session.user.id, filtros);
  
  res.render('coleccion', { 
      user: req.session.user, 
      juegos: misJuegos,
      query: req.query 
  });
});

// Cerrar sesion
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;