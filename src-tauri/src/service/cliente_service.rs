use crate::{
  config::database::get_connection,
  models::cliente::Cliente,
  repository::cliente_repository::*,
};
use tauri::{ command, Manager };

#[command]
pub fn salvar_cliente_controller(window: tauri::Window, cliente: Cliente) {
  let conn = get_connection(window.app_handle().path_resolver());
  let _ = salvar_cliente(cliente, &conn);
}

#[command]
pub fn buscar_todos_clientes_controller(window: tauri::Window) -> Vec<Cliente> {
  let conn = get_connection(window.app_handle().path_resolver());
  let buscar_todos_clientes = buscar_todos_clientes(&conn);
  buscar_todos_clientes.unwrap()
}

#[command]
pub fn buscar_cliente_por_id_controller(window: tauri::Window, cliente_id: i32) -> Cliente {
  let conn = get_connection(window.app_handle().path_resolver());
  let cliente = buscar_cliente_por_id(cliente_id, &conn);
  cliente
}

#[command]
pub fn atualizar_cliente_controller(window: tauri::Window, cliente: Cliente) {
  let conn = get_connection(window.app_handle().path_resolver());
  let _ = editar_cliente(cliente, &conn);
}

#[command]
pub fn remover_cliente_controller(window: tauri::Window, cliente_id: i32) {
  let conn = get_connection(window.app_handle().path_resolver());
  let _ = remover_cliente(cliente_id, &conn);
}
