// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::Connection;

#[derive(serde::Serialize)]
struct Todo {
    id: i32,
    title: String,
    type_: i32,
    start_date: String,
    content: String,
}

fn get_database_flie_dir(app_handle: &tauri::AppHandle) -> String {
    String::from(
        app_handle
            .path_resolver()
            .app_data_dir()
            .unwrap()
            .to_str()
            .unwrap(),
    )
}

fn get_database_flie_path(app_handle: &tauri::AppHandle) -> String {
    format!("{}/data.db", get_database_flie_dir(app_handle))
}

#[tauri::command]
fn fetch_todos(app_handle: tauri::AppHandle) -> Result<Vec<Todo>, String> {
    let conn = Connection::open(get_database_flie_path(&app_handle)).expect("Something error");
    let mut stmt = conn
        .prepare("SELECT id, title, type, startDate, content FROM TODO")
        .expect("Something error");
    let person_iter = stmt
        .query_map([], |row| {
            Ok(Todo {
                id: row.get(0).expect("Something error"),
                title: row.get(1).expect("Something error"),
                type_: row.get(2).expect("Something error"),
                start_date: row.get(3).expect("Something error"),
                content: row.get(4).expect("Something error"),
            })
        })
        .expect("Something error");
    Ok(person_iter
        .map(|x| x.expect("Something error"))
        .collect::<Vec<Todo>>())
}

#[tauri::command]
fn fetch_todo_by_id(app_handle: tauri::AppHandle, id: i32) -> Result<Todo, String> {
    let conn = Connection::open(get_database_flie_path(&app_handle)).expect("Something error");
    let mut stmt = conn
        .prepare("SELECT id, title, type, startDate, content FROM TODO WHERE id = ?1")
        .expect("Something error");
    let person_iter = stmt
        .query_map([id], |row| {
            Ok(Todo {
                id: row.get(0).expect("Something error"),
                title: row.get(1).expect("Something error"),
                type_: row.get(2).expect("Something error"),
                start_date: row.get(3).expect("Something error"),
                content: row.get(4).expect("Something error"),
            })
        })
        .expect("Something error");
    person_iter
        .map(|x| x.expect("Something error"))
        .last()
        .ok_or(String::from("Not Found!"))
}

#[tauri::command]
fn insert_todo(
    app_handle: tauri::AppHandle,
    title: String,
    type_dto: i32,
    start_date: String,
    content: String,
) -> Result<bool, String> {
    let conn = Connection::open(get_database_flie_path(&app_handle)).expect("Something error");
    conn.execute(
        "INSERT INTO TODO (title, type, startDate, content) VALUES (?1, ?2, ?3, ?4)",
        (title, type_dto, start_date, content),
    )
    .expect("Something error");
    Ok(true)
}

#[tauri::command]
fn update_todo_by_id(
    app_handle: tauri::AppHandle,
    id: i32,
    title: String,
    type_dto: i32,
    start_date: String,
    content: String,
) -> Result<bool, String> {
    let conn = Connection::open(get_database_flie_path(&app_handle)).expect("Something error");
    conn.execute(
        "UPDATE TODO SET title = ?1, type = ?2, startDate = ?3, content = ?4 WHERE id = ?5",
        (title, type_dto, start_date, content, id),
    )
    .expect("Something error");
    Ok(true)
}

#[tauri::command]
fn delete_todo_by_id(app_handle: tauri::AppHandle, id: i32) -> Result<bool, String> {
    let conn = Connection::open(get_database_flie_path(&app_handle)).expect("Something error");
    conn.execute("DELETE FROM TODO WHERE id = ?1", [id])
        .expect("Something error");
    Ok(true)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let dir = get_database_flie_dir(&app.handle());
            let path = get_database_flie_path(&app.handle());
            if std::path::Path::new(&path).exists() == false {
                std::fs::create_dir_all(dir).unwrap();
                std::fs::File::create(&path).unwrap();
            }
            let conn = Connection::open(path).unwrap();
            conn.execute(
                "CREATE TABLE IF NOT EXISTS TODO (
                    id         INTEGER PRIMARY KEY,
                    title      TEXT,
                    type       INTEGER,
                    startDate  TEXT,
                    content    TEXT
                )",
                (),
            )
            .unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            fetch_todos,
            insert_todo,
            update_todo_by_id,
            delete_todo_by_id,
            fetch_todo_by_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
