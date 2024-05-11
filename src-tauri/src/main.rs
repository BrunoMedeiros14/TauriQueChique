#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod models;
mod service;

use config::database::get_connection;
use models::cliente::Cliente;
use service::cliente_service::*;

#[tauri::command]
fn salvar_cliente_controller(cliente: Cliente) {
    let conn = get_connection();
    let _ = salvar_cliente(cliente, &conn);
}

#[tauri::command]
fn buscar_todos_clientes_controller() -> Vec<Cliente> {
    let conn = get_connection();
    let buscar_todos_clientes = buscar_todos_clientes(&conn);
    buscar_todos_clientes.unwrap()
}

#[tauri::command]
fn buscar_cliente_por_id_controller(cliente_id: i32) -> Cliente {
    let conn = get_connection();
    let cliente = buscar_cliente_por_id(cliente_id, &conn);
    cliente
}

#[tauri::command]
fn atualizar_cliente_controller(cliente: Cliente) {
    let conn = get_connection();
    let _ = editar_cliente(cliente, &conn);
}

#[tauri::command]
fn remover_cliente_controller(cliente_id: i32) {
    let conn = get_connection();
    let _ = remover_cliente(cliente_id, &conn);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            buscar_todos_clientes_controller,
            buscar_cliente_por_id_controller,
            salvar_cliente_controller,
            atualizar_cliente_controller,
            remover_cliente_controller
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
