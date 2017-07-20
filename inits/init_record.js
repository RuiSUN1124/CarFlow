/*Init the records*/
var record = require('../models/record.js');
var record_json = [{
    recorder:'sr',
    repaireId: '5137',
    timeRepaire: '2017-06-01 06:01', 
    type: '00',
    roadName: '二号大道',
    content: 'battery is used up!'
}, {
   
    recorder:'sr',
    repaireId: '5137',
    timeRepaire: '2017-06-01 06:05', 
    type: '00',
    roadName: '二号大道',
    content: 'Shell is destroyed!'
}]
var record_init = function(json_data){
    for(var i = 0; i<json_data.length;i++)
        record.RecordOp.save(json_data[i],(err)=>{
        if(err){console.log(err+'record initilisation failed!');                
}else{
        console.log('record initilisation succeed!');
    }
});
}
exports.recordinit = function(){
    record_init(record_json);
}