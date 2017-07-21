'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    userId: String,
    //userAdmin: {type: String,default:'Admin'},//this function repetitive?
    userLevel: Number,//Normal: 1 Super: 2
	//avatar: {type: String, default: 'default.jpg'},
    city: String,
    district: String,
    road: String
});
UserSchema.plugin(passportLocalMongoose);

var UserModel = mongodb.mongoose.model('user',UserSchema);

//operations
var UserOp = function(){};
//function save
UserOp.prototype.save = function(obj,callback){
    var instance = new UserModel(obj);
    instance.save(function(err){
        callback(err);
    })
}
UserOp.prototype.validPassword = function(pwd) {
    return ( this.password === pwd );
};

UserOp.prototype.findAll = function(callback){
    UserModel.find({},'-_id -__v',(err, data_all)=>{ 
        var data_all_json = JSON.stringify(data_all);   
        callback(err,data_all_json);        
    });
}
exports.UserOp = new UserOp();
exports.UserModel = UserModel;