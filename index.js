'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var universities = require("./universities.js");

var port = (process.env.PORT || 3000);
var base = '/api/v1';

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

////REST fot Root elements

app.get(base + '/universities', (req, res) => {
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

app.get(base + '/universities/:name', (req, res) => {
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

    console.log('name ' + name);
    console.log('name ' + updatedUniversity.name);

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



//Run in Postman
app.get(base + '/tests', (req, res) => {

    res.send('<html><body><title>AWS - Universities</title><h1>Run in Postman ;)</h1>' +
        '<div class="postman-run-button" data-postman-action="collection/import" data-postman-var-1="09c3562440e997621d12"></div>' +
        '<script type="text/javascript">' +
        '(function (p,o,s,t,m,a,n) {' +
        '!p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });' +
        '!o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((' +
        '(n = o.createElement("script")),' +
        '(n.id = s+t), (n.async = 1), (n.src = m), n' +
        '));' +
        '}(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));' +
        '</script></body></html>');
    console.log('Run in Postman');

});

//Server Starter

universities.connectDb((err) => {
    if (err) {
        console.log("Could not connect with MongoDB");
        process.exit(1);
    }
    app.listen(port, () => {
        console.log("Server with GUI up and running!!");
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
