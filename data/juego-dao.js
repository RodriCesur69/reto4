class JuegoDAO {
    #database;

    constructor(database) {
        this.#database = database;
    }
    
    // Busca los juegos de un usuario y permite filtrar por plataforma o estado
    findJuegosByUserId(id, filtros) {
        let sql = "SELECT * FROM juegos WHERE id_usuario = ?";
        let params = [id];

        // Si el usuario elige un filtro, lo añadimos a la consulta
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

    // Guarda un nuevo juego en la base de datos
    saveJuego(id_usuario, titulo, plataforma, genero, estado) {
        const sql = "INSERT INTO juegos (id_usuario, titulo, plataforma, genero, estado) VALUES (?, ?, ?, ?, ?)";
        return this.#database.prepare(sql).run(id_usuario, titulo, plataforma, genero, estado);
    }

    // Borra un juego usando su ID único
    deleteJuego(id) {
        const sql = "DELETE FROM juegos WHERE id = ?";
        return this.#database.prepare(sql).run(id);
    }
}

module.exports = JuegoDAO;