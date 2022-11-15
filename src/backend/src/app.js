import { openDb } from './configDB.js';
import { createTable, insertDevice, updateDevice, selectDevices, selectDevice, deleteDevice  } from './Controller/device.js';

import express from 'express';
const app = express();
app.use(express.json());

import {router} from './routes.js';
app.use(router);

app.use(express.static('frontend'));

createTable();

const PORT = 3000;

app.get('/', function(req, res){
    res.send('Hello World');
})

app.get('/test', function(req, res){
    res.json({
        "statusCode": 200,
        "mensagem": "Teste de conexão com o servidor"
    });
})

app.get('/devices', async function(req, res){
    let devices = await selectDevices();
    res.json(devices);
})

app.get('/device/:id', async function(req, res){
    let id = req.params.id;
    let device = await selectDevice(id);
    res.json(device);
})

app.post('/device', function(req, res){
    insertDevice(req.body);
    res.json({
        "statusCode": 200
    });
});

app.put('/device', function(req, res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode" : "400",
            "msg":"Você precisa informar um id"
        })
    }else{
        updateDevice(req.body)
        res.json({
            "statusCode": 200
        })
    }
})


app.delete('/device', async function(req, res){
    let device = await deleteDevice(req.body.id);
    res.json({
        "statusCode": 200,
        "msg": "Deletado com sucesso"
    });
})

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);