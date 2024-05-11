use rusqlite::Connection;

pub fn gerar_tabelas(conn: &Connection) {
    let criar_tabela_clientes = "
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        data_nascimento DATE,
        endereco TEXT,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL
      )
    ";
    let _ = conn.execute(&criar_tabela_clientes, ());
}
