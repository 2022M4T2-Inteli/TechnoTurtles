// Descrição: Arquivo responsável por executar a aplicação (Back End)
//importa as funções de outros arquivos
import { createTable, insertDevice, updateDevice, selectDevices, deleteDevice, updateDeviceFromJson, updateStatusfromAddr, updateStatusfromAddr2, selectDevicefromAddr } from './Controller/device.js';
import { createLogTable, insertLog, selectLogs, selectLogsfromAddr } from './Controller/logs.js';

import fetch from "node-fetch";

//importa o express
import express from 'express';
const app = express();
app.use(express.json());

//router que carrega os arquivos html
import { router } from './routes.js';
app.use(router);

//LOADS CSS AND JS FILES (DON'T FORGET)
app.use(express.static('../frontend'));

//cria tabelas de aparelhos e logs
createTable();
createLogTable();

//porta
const PORT = 3000;

//Olá mundo :)
app.get('/', function (req, res) {
    res.send('Hello World');
})

//teste
app.get('/test', function (req, res) {
    res.json({
        "statusCode": 200,
        "mensagem": "Teste de conexão com o servidor"
    });
})

//recebe todos os aparelhos
app.get('/devices', async function (req, res) {
    let devices = await selectDevices();
    res.json(devices);
})

//recebe todos os logs
app.get('/logs', async function (req, res) {
    let logs = await selectLogs();
    res.json(logs);
})

//informação de um aparelho
app.get('/device/:id', async function (req, res) {
    let id = req.params.id;
    let device = await selectDevices(id);
    res.json(device);
})

//recebe a informação de um aparelho no log
app.get('/device/:id', async function (req, res) {
    let id = req.params.id;
    let log = await selectLogs(id);
    res.json(log);
})

//insere um aparelho na base de dados
app.post('/device', function (req, res) {
    insertDevice(req.body);
    res.json({
        "statusCode": 200
    });
});

//muda uma informação de um aparelho
app.put('/device/:id', async function (req, res) {
    if (req.body && !req.params.id) {
        res.json({
            "statusCode": "400",
            "msg": "Você precisa informar um id"
        })
    } else {
        const device = {
            //get all properties from req.body and add id property
            ...req.body,
            //add id property
            id: req.params.id
        }
        await updateDevice(device)
        res.json({
            "statusCode": 200
        })
    }

})

//deleta um aparelho da base de dados
app.delete('/delete_device/:id', async (req, res) => {
    try {
                //deleta o que tiver o parametro(PARAMS) id informado
        await deleteDevice(req.params.id);
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

//Seção de recebimento de dados do ESP32--------------------------------------------------------------

// preciso fazer uma contagem de quantos dispositivos estão em cada sala, por isso 
// talvez na função aqui embaixo precisaremos contabilizar essa função
// mas essas coisas dependem 

app.get('/test_device', async (req, res) => {
    const devices = await fetch('http://10.128.65.2/list_devices').then(data => {
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
        "statusCode": 200,
        devices: devices
    })
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

//---------------------------------------------------------------------------------------------

//quando iniciado o servidor, ele vai rodar na porta 3000
app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
