use rusqlite::Connection;

use super::schemas::gerar_tabelas;

pub fn get_connection() -> Connection {
    let database_url = "que-chique.db";
    let conn = Connection::open(database_url).unwrap();

    gerar_tabelas(&conn);
    conn
}
