'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const cors = require("cors");
var universities = require("./universities.js");

var port = (process.env.PORT || 3000);
var base = '/api/v1';

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//app.use(cors());




////REST fot Root elements

app.get(base + '/universities', cors(), (req, res) => {
    console.log('GET universities');

    universities.allUniversities((err, universities) => {
        res.send(universities);
    });

});

app.post(base + '/universities', (req, res) => {
    console.log('POST university');

    var university = req.body;

    universities.get(university.acronym, (err, universities_) => {
        if (universities_.length === 0) {
            universities.add(university);
            res.sendStatus(201);
        }
        else {
            res.sendStatus(409);
        }
    });

});

app.delete(base + '/universities', (req, res) => {
    console.log('DELETE universities');

    universities.removeAll((err, numRemoved) => {
        console.log('Deleted:' + numRemoved + "universities");
        res.sendStatus(200);
    });

});

//REST for specific elements

app.get(base + '/universities/:name', cors(), (req, res) => {
    var name = req.params.name;

    console.log(name);

    universities.get(name, (err, universities_) => {
        if (universities_.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.send(universities_[0]);
        }
    });
    console.log('GET university');
});

app.delete(base + '/universities/:name', (req, res) => {
    var name = req.params.name;

    universities.remove(name, (err, numRemoved) => {
        if (numRemoved === 0) {
            res.sendStatus(404);
        }
        else {
            console.log('DELETE university ' + name);
            res.sendStatus(200);
        }
    });
});

app.put(base + '/universities/:name', (req, res) => {
    var name = req.params.name;
    var updatedUniversity = req.body;

    console.log('acronym ' + name);
    console.log('name ' + updatedUniversity.name);
    delete updatedUniversity._id;
    universities.update(name, updatedUniversity, (err, numUpdates) => {
        if (numUpdates === 0) {
            res.sendStatus(404);
            console.log('PUT university ERROR ' + err);
        }
        else {
            console.log('PUT university ' + name);
            res.sendStatus(200);
        }

    });
});

//Server Starter

universities.connectDb((err) => {
    if (err) {
        console.log("Could not connect with MongoDB");
        process.exit(1);
    }
    app.listen(port, () => {
        console.log("Server with GUI up and running!!");
        universities.removeAll();
        loadDummyData();
    });
});


//Home Page Hola
app.get('/', () => {
    console.log('New request');
});

//Help functions

function loadDummyData() {
    var sourceFile = require('./dummyData.js');

    sourceFile.dummyData.forEach(function(university) {
        universities.add(university);
    });
}


/*app.get(base + '/groups', cors(), (req, res) => {
    console.log('GET groups');
    var groups = [{name : "Grupo de investigacion 1", id: "1", university: "US"}, {name : "Grupo de investigacion 2", id: "2", university: "APEC"}]
    res.send(groups);
});*/