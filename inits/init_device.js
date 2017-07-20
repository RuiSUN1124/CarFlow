/*Init the devices*/
var device = require('../models/device.js');
var device_json = [{
    deviceId: '5174',
    type: '00',
    location: {
        xPoint: 120.374394,
        yPoint:  30.309838
    },
    belongGate: '201705013889',
    roadName: '二号大道',
	setTime: '2017-05-27 07：15',
}, {
     deviceId: '5174',
    type: '00',
    location: {
        xPoint: 122.374394,
        yPoint:  31.309838
    },
    belongGate: '201705013889',
    roadName: '四号大道',
	setTime: '2017-05-27 07：15',
},{
     deviceId: '5174',
    type: '00',
    location: {
        xPoint: 130.374394,
        yPoint:  20.309838
    },
    belongGate: '201705013888',
    roadName: '六号大道',
	setTime: '2017-05-27 07：15',
}]
var device_init = function(json_data){
    for(var i = 0; i<json_data.length;i++)
        device.DeviceOp.save(json_data[i],(err)=>{
        if(err){console.log(err+'device initilisation failed!');                
}else{
        console.log('device initilisation succeed!');
    }
});
}
exports.deviceinit = function(){
    device_init(device_json);
}