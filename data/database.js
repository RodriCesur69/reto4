class Database {
    static #db = null;
    constructor() {
      throw new Error("No se puede instanciar. Usa .getInstance()");
    }
    static getInstance(dbPath) {
      if (Database.#db == null) {
        const BetterSqlite3 = require("better-sqlite3");
        Database.#db = new BetterSqlite3(dbPath);
        require("./initialize-usuarios")(Database.#db);
        require("./initialize-juegos")(Database.#db);
      }
      return Database.#db;
    }
    static prepare(sql) {
      return Database.#db.prepare(sql);
    }
  }
  module.exports = Database;