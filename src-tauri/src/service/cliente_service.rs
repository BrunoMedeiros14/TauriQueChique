use chrono::NaiveDate;
use rusqlite::{params, Connection, Result};

use crate::models::cliente::Cliente;

#[derive(Debug)]
struct ClienteDb {
    id: Option<i32>,
    nome: String,
    data_nascimento: Option<String>,
    endereco: String,
    telefone: String,
    email: String,
}

fn cliente_from_model_db(cliente_db: ClienteDb) -> Cliente {
    Cliente {
        id: cliente_db.id,
        nome: cliente_db.nome,
        data_nascimento: cliente_db
            .data_nascimento
            .map(|data| NaiveDate::parse_from_str(&data, "%Y-%m-%d").unwrap()),
        endereco: cliente_db.endereco,
        telefone: cliente_db.telefone,
        email: cliente_db.email,
    }
}

fn model_db_from_cliente(cliente: Cliente) -> ClienteDb {
    ClienteDb {
        id: cliente.id,
        nome: cliente.nome.clone(),
        data_nascimento: cliente
            .data_nascimento
            .map(|date| date.format("%Y-%m-%d").to_string()),
        endereco: cliente.endereco.clone(),
        telefone: cliente.telefone.clone(),
        email: cliente.email.clone(),
    }
}

pub fn salvar_cliente(cliente: Cliente, conn: &Connection) -> Result<()> {
    let cliente_db = model_db_from_cliente(cliente);
    conn.execute(
        "INSERT INTO clientes (nome, data_nascimento, endereco, telefone, email)
         VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            cliente_db.nome,
            cliente_db.data_nascimento,
            cliente_db.endereco,
            cliente_db.telefone,
            cliente_db.email
        ],
    )?;
    Ok(())
}

pub fn buscar_cliente_por_id(cliente_id: i32, conn: &Connection) -> Cliente {
    let cliente_db = conn.query_row(
        "SELECT * FROM clientes WHERE id = ?1",
        params![cliente_id],
        |row| {
            Ok(ClienteDb {
                id: row.get(0)?,
                nome: row.get(1)?,
                data_nascimento: row.get(2)?,
                endereco: row.get(3)?,
                telefone: row.get(4)?,
                email: row.get(5)?,
            })
        },
    );

    cliente_db
        .map(|cliente_db| cliente_from_model_db(cliente_db))
        .unwrap()
}

pub fn buscar_todos_clientes(conn: &Connection) -> Result<Vec<Cliente>> {
    let mut stmt = conn.prepare("SELECT * FROM clientes")?;
    let rows = stmt.query_map([], |row| {
        Ok(ClienteDb {
            id: row.get(0)?,
            nome: row.get(1)?,
            data_nascimento: row.get(2)?,
            endereco: row.get(3)?,
            telefone: row.get(4)?,
            email: row.get(5)?,
        })
    })?;

    let clientes = rows
        .map(|row| cliente_from_model_db(row.unwrap()))
        .collect::<Vec<_>>();
    Ok(clientes)
}

pub fn editar_cliente(cliente: Cliente, conn: &Connection) -> Result<()> {
    let cliente_db = model_db_from_cliente(cliente);
    conn.execute(
        "UPDATE clientes
         SET nome = ?1, data_nascimento = ?2, endereco = ?3, telefone = ?4, email = ?5
         WHERE id = ?6",
        params![
            cliente_db.nome,
            cliente_db.data_nascimento,
            cliente_db.endereco,
            cliente_db.telefone,
            cliente_db.email,
            cliente_db.id
        ],
    )?;
    Ok(())
}

pub fn remover_cliente(id: i32, conn: &Connection) -> Result<()> {
    conn.execute("DELETE FROM clientes WHERE id = ?1", params![id])?;
    Ok(())
}
