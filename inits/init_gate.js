/*Init the gates*/
var gate = require('../models/gate.js');
var gate_json = [{
    gateId: '201705013889',
    type: '00', 
    location: {
        xPoint: 120.374391,
        yPoint:  30.309836
    },
    roadName: '二号大道',
    setTime: '2017-05-57 07:57',
}, {
    gateId: '201705013888',
    type: '00', 
    location: {
        xPoint: 122.374391,
        yPoint:  30.319836
    },
    roadName: '三号大道',
    setTime: '2017-05-57 07:58',
}]
var gate_init = function(json_data){
    for(var i = 0; i<json_data.length;i++)
        gate.GateOp.save(json_data[i],(err)=>{
        if(err){console.log(err+'gate initilisation failed!');                
}else{
        console.log('gate initilisation succeed!');
    }
});
}
exports.gateinit = function(){
    gate_init(gate_json);
}