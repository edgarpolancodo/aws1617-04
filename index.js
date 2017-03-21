var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dataStore = require('nedb');
var dbFileName = path.join(__dirname, 'Universities.json');

var db = new dataStore({
    filename: dbFileName,
    autoload: true
});

var port = (process.env.PORT || 3000);
var base = '/api/v1';

var app = express();
app.use(bodyParser.json());

//Metodo para raiz de elementos 

app.get(base + '/universities', (req, res) => {
    console.log('GET universities');

    db.find({}, (err, universities) => {
        res.send(universities);
    });
    
});

app.post(base + '/universities', (req, res) => {
    console.log('POST university');

    var university = req.body;
    db.insert(university);

    res.sendStatus(201);
    
});

app.delete(base + '/universities', (req, res) => {
    console.log('DELETE universities');

    db.remove({}, {}, (err, numRemoved) => {
        res.sendStatus(200);
    });

});


//Metodos para elemento especifico

app.get(base + '/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('GET university');
});

app.delete(base + '/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('DELETE university');
});
app.put(base + '/universities/:name', (req, res) => {
    res.sendStatus(200);
    var name = req.params.name;
    console.log('PUT university');
});

//Inicializador de servicio
app.listen(port, () => {
    console.log('Server is running for 42K...' + process.env.IP)
});

//Pagina inicial
app.get('/', (req, res) => {
    res.send('<html><body><h1>Pagina inicial</h1></body></html>');
    console.log('New request');
});
