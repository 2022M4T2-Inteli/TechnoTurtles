import { createTable, insertDevice, updateDevice, selectDevices, deleteDevice, updateDeviceFromJson, updateStatusfromAddr, updateStatusfromAddr2, selectDevicefromAddr } from './Controller/device.js';
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

// preciso fazer uma contagem de quantos dispositivos estão em cada sala, por isso 
// talvez na função aqui embaixo precisaremos contabilizar essa função
// mas essas coisas dependem 

app.get('/test_device', async (req, res) => {
    const devices = await fetch('http://10.128.65.147/list_devices').then(data => {
        return data.json();
    });
    /*Tratar os dados aqui*/
    //res.json(devices);
    // const obj = JSON.parse(devices);
    // console.log(devices.length);
    console.log(devices);
    for (let i = 0; i <= 200; i++) {
        console.log(devices[`${i}`]);
        updateStatusfromAddr(devices[`${i}`]);
        // insertLog(obj[i]);
    }
    res.json({
        "statusCode": 200
    });
});

app.get('/test_device2', async (req, res) => {
    const devices = await fetch('http://172.16.176.79/list_devices').then(data => {
        return data.json();
    });
    /*Tratar os dados aqui*/
    //res.json(devices);
    // const obj = JSON.parse(devices);
    for (let i = 0; i <= 200; i++) {
        console.log(devices[`${i}`]);
        updateStatusfromAddr2(devices[`${i}`]);
        // insertLog(obj[i]);
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
