import { openLogsDb } from "../configDB.js";

//create table
export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS LOGS ( id INTEGER PRIMARY KEY, time INTEGER, date TEXT, localizacao INTEGER, patrimonio INTEGER, endereco TEXT, status TEXT, responsavel TEXT ) ');
    })
}

//get all devices
export async function selectLogs(req, res) {
    return openDb().then(async (db) => {
        const res = await db.all('SELECT * FROM LOGS')
        return res;
    });
}

//get device by id
export async function selectLogsfromAddr(addr) {
    return openDb().then(async (db) => {
        const res = await db.get('SELECT * FROM LOGS WHERE endereco=?', [addr]);
        return res;
    });
}

//insert device
export async function insertLog(log) {
    openDb().then(db => {
        db.run('INSERT INTO LOGS (time, date, localizacao, patrimonio, endereco, status, responsavel) VALUES (?,?,?,?,?,?,?)', [log.time, log.date, log.localizacao, log.patrimonio, log.endereco, log.status, log.responsavel]);
    })
} 
