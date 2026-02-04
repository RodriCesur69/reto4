// Este codigo revisa si el usuario tiene permiso para entrar
module.exports = (req, res, next) => {
    // Si existe una sesión de usuario, entramos
    if (req.session.user) {
        next();
    } else {
        // Si no está logueado, lo mandamos al login de nuevo
        res.redirect('/login');
    }
};