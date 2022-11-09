import { openDb } from './configDB.js';
import { createTable, insertDevice, updateDevice, selectDevices, selectDevice, deleteDevice  } from './Controller/device.js';

import express from 'express';
const app = express();
app.use(express.json());

createTable();

const port = 3000;

app.get('/', function(req, res){
    res.send('Hello World');
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

app.get('/devices', async function(req, res){
    let devices = await selectDevices();
    res.json(devices);
})

app.get('/device', async function(req, res){
    let device = await selectDevice(req.body.id);
    res.json(device);
})

app.delete('/device', async function(req, res){
    let device = await deleteDevice(req.body.id);
    res.json({
        "statusCode": 200,
        "msg": "Deletado com sucesso"
    });
})

app.listen(port, function(){
    console.log('Api rodando na porta ' + port);
});
