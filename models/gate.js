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
GateSchema.plugin(passportLocalMongoose);
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

exports.GateOp = new GateOp();
exports.GateModel = GateModel;