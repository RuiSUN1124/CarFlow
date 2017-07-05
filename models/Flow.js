var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var FlowSchema = new Schema({
    crossID: String,
    interval: Number,
    deviceType: String,
    laneNo: String,
    dateTime: Date,
    volume: Number,
    volume1: Number,
    volume2: Number,
    volume3: Number,
    volume4: Number,
    volume5: Number,
    aveOccup: Number,
    aveHeader: Number,
    aveLength: Number,
    aveSpeed: Number,
    saturation: Number,
    density: Number,
    pcu: Number,
    aveQueue: Number,
    //test order definition
    Num_packet: Number
});
//Establish a model who decide the name of the collection, for example, 'flowCar' ------> flowcars in mongo db
var FlowModel = mongodb.mongoose.model('flowCar',FlowSchema);

//operations, in fact it's a class defenition!
var FlowOp = function(){};
//function save
FlowOp.prototype.save = function(obj,callback){
    var instance = new FlowModel(obj);
    instance.save(function(err){
        callback(err);
    })
}
//in this way, return not a class but object.
//if we need return a class, should change the code as:  modules.exports = FlowOp
module.exports = new FlowOp();