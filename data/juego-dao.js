class JuegoDAO {
    #database;

    constructor(database) {
        this.#database = database;
    }
    
    // AquiBusca los juegos de un usuario y permite filtrar por plataforma o estado
    findJuegosByUserId(id, filtros) {
        let sql = "SELECT * FROM juegos WHERE id_usuario = ?";
        let params = [id];

        // Si el usuario elige un filtro, lo ponemos
        if (filtros.plataforma) { 
            sql += " AND plataforma = ?"; 
            params.push(filtros.plataforma); 
        }
        if (filtros.genero) { 
            sql += " AND genero = ?"; 
            params.push(filtros.genero); 
        }
        if (filtros.estado) { 
            sql += " AND estado = ?"; 
            params.push(filtros.estado); 
        }

        return this.#database.prepare(sql).all(...params);
    }

    findJuegoById(id) {
        const sql = "SELECT * FROM juegos WHERE id = ?";
        return this.#database.prepare(sql).get(id);
    }

    // Guarda un nuevo juego en la base de datos
    saveJuego(id_usuario, titulo, plataforma, genero, estado) {
        const sql = "INSERT INTO juegos (id_usuario, titulo, plataforma, genero, estado) VALUES (?, ?, ?, ?, ?)";
        return this.#database.prepare(sql).run(id_usuario, titulo, plataforma, genero, estado);
    }

    updateJuego(id, titulo, plataforma, genero, estado) {
        const sql = "UPDATE juegos SET titulo = ?, plataforma = ?, genero = ?, estado = ? WHERE id = ?";
        return this.#database.prepare(sql).run(titulo, plataforma, genero, estado, id);
    }

    // Borra un juego usando el ID 
    deleteJuego(id) {
        const sql = "DELETE FROM juegos WHERE id = ?";
        return this.#database.prepare(sql).run(id);
    }
}

module.exports = JuegoDAO;