import { openDb } from "../configDB.js";


//create table
export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Devices ( id INTEGER PRIMARY KEY, tipo TEXT, patrimonio INTEGER, localizacao INTEGER, endereco TEXT, status TEXT ) ');
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
        db.run('INSERT INTO Devices (tipo, patrimonio, localizacao, endereco, status) VALUES (?,?,?,?,?)', [device.tipo, device.patrimonio, device.localizacao, device.endereco, device.status]);
    })
} 

//update device
export async function updateDevice(device){
    openDb().then(db=>{
        db.run('UPDATE Devices SET tipo=?, patrimonio=?, localizacao=?, endereco=?, status=? WHERE id=?', [device.tipo, device.patrimonio, device.localizacao, device.endereco, device.status, device.id]);
    })
}

//delete device
export async function deleteDevice(id){
    return openDb().then(async (db) => {
        const res = await db.run('DELETE FROM Devices WHERE id=?', [id]);
        return res;
    });
}