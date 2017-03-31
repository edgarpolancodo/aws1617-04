var path = require('path');
var dataStore = require('nedb');
var dbFileName = path.join(__dirname, 'Universities.json');

var db = new dataStore({
    filename: dbFileName,
    autoload: true
});

var Universities = function(){};

Universities.prototype.allUniversities = function(callback){
    
  return db.find({}, callback);
    
};

Universities.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Universities.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Universities.prototype.get = function(name, callback) {
    return db.find({name:name}, callback);
};

Universities.prototype.remove = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

Universities.prototype.update = function(name, updatedContact, callback) {
    return db.update({name:name},updatedContact,{}, callback);
};
module.exports = new Universities();