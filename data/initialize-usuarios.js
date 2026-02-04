module.exports = (db) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;
    db.prepare(sql).run();

    const cuenta = db.prepare('SELECT count(*) as total FROM usuarios').get();
    if(cuenta.total === 0){
        
        db.prepare('INSERT INTO usuarios (email, password) VALUES (?, ?)').run('rodri', 'rodri');
    }
}