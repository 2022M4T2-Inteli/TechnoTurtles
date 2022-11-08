const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;


app.get('/', function(req, res){
    res.send('Hello World');
})

app.post('/device', function(req, res){
    console.log(req.body);
    res.json({
        "statusCode": 200
    })
});

app.listen(port, function(){
    console.log('Api rodando na porta ' + port);
});
