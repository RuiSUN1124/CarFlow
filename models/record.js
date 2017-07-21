'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var RecordSchema = new Schema({
    repaireId: String, //id of device/gate
    timeRepaire: String,
    type: String,//type of Gate/device
    roadName: String,
    content: String,
});
RecordSchema.index({"repaireId":1},{unique: true});
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
RecordOp.prototype.findAll = function(callback){
    RecordModel.find({},'-_id -__v',(err, data_all)=>{ 
        var data_all_json = JSON.stringify(data_all);   
        callback(err,data_all_json);        
    });
}
exports.RecordOp = new RecordOp();
exports.RecordModel = RecordModel;