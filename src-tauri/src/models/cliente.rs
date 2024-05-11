use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Cliente {
    pub id: Option<i32>,
    pub nome: String,
    #[serde(rename = "dataNascimento")]
    pub data_nascimento: Option<NaiveDate>,
    pub endereco: String,
    pub telefone: String,
    pub email: String,
}
