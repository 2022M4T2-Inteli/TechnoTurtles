import { openDb } from "../configDB.js";

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Devices ( id INTEGER PRIMARY KEY, tipo TEXT, patrimonio INTEGER, sala INTEGER ) ');
    })
} 

export async function insertDevice(device){
    openDb().then(db=>{
        db.run('INSERT INTO Devices (tipo, patrimonio) VALUES (?,?)', [device.tipo, device.patrimonio]);
    })
} 

export async function updateDevice(device){
    openDb().then(db=>{
        db.run('UPDATE Devices SET tipo=?, patrimonio=? WHERE id=?', [device.tipo, device.patrimonio, device.id]);
    })
}

export async function selectDevices(req, res){
    openDb().then(async (db) => {
        db.all('SELECT * FROM Devices')
        .then(devices => res.json(devices))
    });
}

export async function selectDevice(id){
    return openDb().then(async (db) => {
        const res = await db.get('SELECT * FROM Devices WHERE id=?', [id]);
        return res;
    });
}

export async function deleteDevice(id){
    return openDb().then(async (db) => {
        const res = await db.run('DELETE FROM Devices WHERE id=?', [id]);
        return res;
    });
}