'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var DeviceSchema = new Schema({
    deviceId: String,
    type: String,
    location: {xPoint: Number,
               yPoint: Number },
    belongGate: String,
    roadName: String,
	setTime: String,
});
DeviceSchema.plugin(passportLocalMongoose);
//collection name
var DeviceModel = mongodb.mongoose.model('device',DeviceSchema);

//operations
var DeviceOp = function(){};
//function save
DeviceOp.prototype.save = function(obj,callback){
    var instance = new DeviceModel(obj);
    instance.save(function(err){
        callback(err);
    })
}

DeviceOp.prototype.findAll = function(callback){
    DeviceModel.find({},'-_id -__v',(err, data_all)=>{ 
//js obj convert to json            
        var data_all_json = JSON.stringify(data_all);   
        callback(err,data_all_json);        
    });
}
exports.DeviceOp = new DeviceOp();
exports.DeviceModel = DeviceModel;