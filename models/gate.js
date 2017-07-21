'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var GateSchema = new Schema({
    gateId: String,
    type: String,
    location: {xPoint: Number,
               yPoint: Number },
    roadName: String,
   setTime: String
});
GateSchema.index({"gateId":1},{unique: true});
//GateSchema.plugin(passportLocalMongoose);
//collection name
var GateModel = mongodb.mongoose.model('gate',GateSchema);

//operations
var GateOp = function(){};
//function save
GateOp.prototype.save = function(obj,callback){
    var instance = new GateModel(obj);
    instance.save(function(err){
        callback(err);
    })
}

GateOp.prototype.findAll = function(callback){
    GateModel.find({},'-_id -__v',(err, data_all)=>{ 
        var data_all_json = JSON.stringify(data_all);   
        callback(err,data_all_json);        
    });
}
exports.GateOp = new GateOp();
exports.GateModel = GateModel;