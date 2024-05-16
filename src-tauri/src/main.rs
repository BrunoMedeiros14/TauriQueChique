#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod models;
mod repository;
mod service;

fn main() {
  tauri::Builder
    ::default()
    // .manage(AppState {
    //   db: Default::default(),
    // })
    .on_window_event(move |event| {
      match event.event() {
        tauri::WindowEvent::Destroyed => {
          print!("Saindo do sistema");
          std::process::exit(0);
        }
        _ => {}
      }
    })
    .invoke_handler(
      tauri::generate_handler![
        service::cliente_service::salvar_cliente_controller,
        service::cliente_service::buscar_todos_clientes_controller,
        service::cliente_service::buscar_cliente_por_id_controller,
        service::cliente_service::atualizar_cliente_controller,
        service::cliente_service::remover_cliente_controller
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
