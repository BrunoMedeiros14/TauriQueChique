use std::fs;

use rusqlite::Connection;
use tauri::PathResolver;

use super::schemas::gerar_tabelas;

pub fn get_connection(path_resolver: PathResolver) -> Connection {
  let app_dir = path_resolver.app_data_dir().expect("The app data directory should exist.");
  fs::create_dir_all(&app_dir).expect("The app data directory should be created.");
  let sqlite_path = app_dir.join("que-chique.sqlite");
  let conn = Connection::open(sqlite_path).unwrap();

  gerar_tabelas(&conn);
  conn
}
