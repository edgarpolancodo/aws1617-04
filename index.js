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

////REST fot Root elements

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

    db.remove({}, {
        multi: true
    }, (err, numRemoved) => {
        res.sendStatus(200);
    });

});

//REST for specific elements

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

//Server Starter

app.listen(port, () => {
    console.log('Server is running for 42K...' + process.env.IP)
    loadDummyData();
});

//Home Page
app.get('/', (req, res) => {
    res.send('<html><body><title>AWS - Universities</title><h1>Home Page</h1></body></html>');
    console.log('New request');
});

function loadDummyData() {
    var sourceFile = require('./dummyData.js');

    sourceFile.dummyData.forEach(function(university, index) {
        db.insert(university);
    });

}
