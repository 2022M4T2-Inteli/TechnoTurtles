import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

//abre a conexão com o banco de dados
export async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

//abre a conexão com o banco de dados de logs
export async function openLogsDb() {
  return open({
    filename: './logs.db',
    driver: sqlite3.Database
  })
}