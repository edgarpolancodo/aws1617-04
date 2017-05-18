"use strict";
var MongoClient = require('mongodb').MongoClient;
var db;

var Universities = function(){};

Universities.prototype.connectDb = function(callback) {
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.collection('universities');
        
        callback(err, database);
    });
};

Universities.prototype.allUniversities = function(callback){
  return db.find({}).toArray(callback);
    
};

Universities.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Universities.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Universities.prototype.get = function(name, callback) {
    return db.find({acronym:name}).toArray(callback);
};

Universities.prototype.remove = function(name, callback) {
    return db.remove({acronym:name},{ multi: true}, callback);
};

Universities.prototype.update = function(name, updatedContact, callback) {
    return db.update({acronym:name},updatedContact,{}, callback);
};

module.exports = new Universities();