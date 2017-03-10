var express = require('express');
var bodyParser = require('body-parser');
var port = (process.env.PORT || 3000);
var app = express();


app.use(bodyParser.json());

var base ='/api/v1';

//Metodo para raiz de elementos 

app.get(base+'/universities', (req, res) => {
    res.sendStatus(200);
    console.log('GET universities');
});

app.post(base+'/universities', (req, res) => {
    res.sendStatus(201);
    console.log('POST university');
});

app.delete(base+'/universities', (req, res) => {
    res.sendStatus(200);
    console.log('DELETE universities');
});


//Metodos para elemento especifico

app.get(base+'/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('GET university');
});

app.delete(base+'/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('DELETE university');
});
app.put(base+'/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('PUT university');
});

//Inicializador de servicio
app.listen(port, () => {
    console.log('servidor corriendo...' + process.env.IP)
});

//Pagina inicial
app.get('/', (req, res) => {
    res.send('<html><body><h1>Pagina inicial</h1></body></html>');
    console.log('Nueva solicitud');
});