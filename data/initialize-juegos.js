module.exports = (db) => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS juegos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER,
            titulo TEXT,
            plataforma TEXT,
            genero TEXT,
            estado TEXT,
            FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        )
    `).run();
}