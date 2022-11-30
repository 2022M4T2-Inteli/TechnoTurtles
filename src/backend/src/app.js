import { createTable, insertDevice, updateDevice, selectDevices, deleteDevice, updateDeviceFromJson, updateStatusfromAddr, selectDevicefromAddr } from './Controller/device.js';
import { createLogTable, insertLog, selectLogs, selectLogsfromAddr } from './Controller/logs.js';

import fetch from "node-fetch";

import express from 'express';
const app = express();
app.use(express.json());

import { router } from './routes.js';
app.use(router);

//LOADS CSS AND JS FILES (DON'T FORGET)
app.use(express.static('../frontend'));

createTable();
createLogTable();

const PORT = 3000;

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/test', function (req, res) {
    res.json({
        "statusCode": 200,
        "mensagem": "Teste de conexão com o servidor"
    });
})

app.get('/devices', async function (req, res) {
    let devices = await selectDevices();
    res.json(devices);
})

app.get('/logs', async function (req, res) {
    let logs = await selectLogs();
    res.json(logs);
})

app.get('/device/:id', async function (req, res) {
    let id = req.params.id;
    let device = await selectDevices(id);
    res.json(device);
})

app.get('/device/:id', async function (req, res) {
    let id = req.params.id;
    let log = await selectLogs(id);
    res.json(log);
})

app.post('/device', function (req, res) {
    insertDevice(req.body);
    res.json({
        "statusCode": 200
    });
});

app.put('/device/:id', async function (req, res) {
    if (req.body && !req.body.id) {
        res.json({
            "statusCode": "400",
            "msg": "Você precisa informar um id"
        })
    } else {
        await updateDevice(req.body)
        res.json({
            "statusCode": 200
        })
    }
})


app.delete('/device/:id', async (req, res) => {
    try {
        await deleteDevice(req.body.id);
        res.json({
            "statusCode": 200,
            "msg": "Deletado com sucesso"
        });
    } catch (err) {
        console.log(err);
        res.json({
            "statusCode": 400,
            "msg": "Erro ao deletar"
        });
    }
})

//-------------------------------------------------------------------------------------

app.get('/test_device', async (req, res) => {
    const devices = await fetch('http://10.128.1.188/list_devices').then(data => {
        return data.json();
    });
    /*Tratar os dados aqui*/
    //res.json(devices);
    const obj = JSON.parse(devices);
    for (let i = 0; i <= obj.length; i++) {
        updateStatusfromAddr(obj[i]);
        insertLog(obj[i]);
    }
    res.json({
        "statusCode": 200
    });
});


app.post('/test_device', function (req, res) {
    console.log(req.body);
    res.send('ok');
});

//---------------------------------------------------------------------------------------

app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
