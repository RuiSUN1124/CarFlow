'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var RecordSchema = new Schema({
    repaireId: String, //id of device/gate
    timeRepaire: String,
    type: String,//type of device/gate
    roadName: String,
    content: String,
});
RecordSchema.plugin(passportLocalMongoose);
//collection name
var RecordModel = mongodb.mongoose.model('record',RecordSchema);

//operations
var RecordOp = function(){};
//function save
RecordOp.prototype.save = function(obj,callback){
    var instance = new RecordModel(obj);
    instance.save(function(err){
        callback(err);
    })
}

exports.RecordOp = new RecordOp();
exports.RecordModel = RecordModel;