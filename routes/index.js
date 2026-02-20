var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var Database = require('../data/database');
const UsuarioDAO = require("../data/usuario-dao");
const JuegoDAO = require('../data/juego-dao');

var db = Database.getInstance("videojuegos.db");
var usuarioDao = new UsuarioDAO(db);
var juegoDao = new JuegoDAO(db);


router.get('/', function(req, res) {
  res.render('index', { title: 'Gestión de Videojuegos' });
});


router.get('/login', function(req, res) {
  res.render('login', { error: null });
});


router.post('/login', function(req, res) {
  const usuario = usuarioDao.findUserByEmail(req.body.email);
  if(usuario && req.body.password === usuario.password){
    req.session.user = { email: usuario.email, id: usuario.id };
    res.redirect("/coleccion");
  } else {
    res.render('login', { error: 'Datos incorrectos' });
  }
});


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


router.post('/juegos/insertar', authMiddleware, function(req, res) {
  const { titulo, plataforma, genero, estado } = req.body;
  juegoDao.saveJuego(req.session.user.id, titulo, plataforma, genero, estado);
  res.json({ success: true, mensaje: 'Juego insertado correctamente' });
});

router.get('/juegos/editar/:id', authMiddleware, function(req, res) {
  const juego = juegoDao.findJuegoById(req.params.id);
  res.render('editar-juego', { juego: juego, user: req.session.user });
});


router.post('/juegos/actualizar/:id', authMiddleware, function(req, res) {
  const { titulo, plataforma, genero, estado } = req.body;
  juegoDao.updateJuego(req.params.id, titulo, plataforma, genero, estado);
  res.json({ success: true, mensaje: 'Juego actualizado correctamente' });
});

router.get('/juegos/eliminar/:id', authMiddleware, function(req, res) {
  juegoDao.deleteJuego(req.params.id);
  res.redirect('/coleccion');
});


router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;