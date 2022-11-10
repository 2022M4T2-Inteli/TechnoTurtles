import { openDb } from "../configDB.js";


//create table
export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Devices ( id INTEGER PRIMARY KEY, tipo TEXT, patrimonio INTEGER, sala INTEGER ) ');
    })
} 

//get all devices
export async function selectDevices(req, res){
    return openDb().then(async (db) => {
        const res = await db.all('SELECT * FROM Devices')
        return res;
    });
}

//get device by id
export async function selectDevice(id){
    return openDb().then(async (db) => {
        const res = await db.get('SELECT * FROM Devices WHERE id=?', [id]);
        return res;
    });
}

//insert device
export async function insertDevice(device){
    openDb().then(db=>{
        db.run('INSERT INTO Devices (tipo, patrimonio, sala) VALUES (?,?,?)', [device.tipo, device.patrimonio, device.sala]);
    })
} 

//update device
export async function updateDevice(device){
    openDb().then(db=>{
        db.run('UPDATE Devices SET tipo=?, patrimonio=?, sala=? WHERE id=?', [device.tipo, device.patrimonio, device.sala, device.id]);
    })
}

//delete device
export async function deleteDevice(id){
    return openDb().then(async (db) => {
        const res = await db.run('DELETE FROM Devices WHERE id=?', [id]);
        return res;
    });
}