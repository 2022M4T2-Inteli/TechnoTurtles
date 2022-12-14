import { openDb } from "../configDB.js";

//Este arquivo é responsável por fazer as operações no banco de dados e exportar as funções para o app.js

//update device from json
export async function updateDeviceFromJson(json) {
    const obj = JSON.parse(json);
    console.log(obj[0]);
    for (let i = 0; i <= obj.length; i++) {
        updateStatusfromAddr(obj[i]);
    }
}

//create table
export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Devices ( id INTEGER PRIMARY KEY, tipo TEXT, patrimonio INTEGER, localizacao INTEGER, endereco TEXT, status TEXT ) ');
    })
}

//get all devices
export async function selectDevices(req, res) {
    return openDb().then(async (db) => {
        const res = await db.all('SELECT * FROM Devices')
        return res;
    });
}

export async function updateStatusfromAddr(addr) {
    openDb().then(db => {
        db.run('UPDATE Devices SET status = "ENCONTRADO", localizacao=1 WHERE endereco = "' + addr + '"');
    });
}

export async function updateStatusfromAddr2(addr) {
    openDb().then(db => {
        db.run('UPDATE Devices SET status = "ENCONTRADO", localizacao=2 WHERE endereco = "' + addr + '"');
    });
}

//get device by id
export async function selectDevicefromAddr(addr) {
    return openDb().then(async (db) => {
        const res = await db.get('SELECT * FROM Devices WHERE endereco=?', [addr]);
        return res;
    });
}

//insert device
export async function insertDevice(device) {
    openDb().then(db => {
        db.run('INSERT INTO Devices (tipo, patrimonio, localizacao, endereco, status) VALUES (?,?,?,?,?)', [device.tipo, device.patrimonio, device.localizacao, device.endereco, device.status]);
    })
}

//update device
export async function updateDevice(device) {
    await openDb().then(db => {
        db.run('UPDATE Devices SET tipo=?, patrimonio=?, localizacao=?, endereco=?, status=? WHERE id=?', [device.tipo, device.patrimonio, device.localizacao, device.endereco, device.status, device.id]);
    })
}

//delete device
export async function deleteDevice(id) {
    try {
        await openDb().then(db => {
            db.run('DELETE FROM Devices WHERE id=?', [id]);
        })
    } catch (err) {
        console.log(err);
    }
}