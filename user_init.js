/*Init the users/administater*/
var user = require('./models/user.js');
var user_json = [{
    username: 'sunr',
    password: 1122,
    userId: '0000',
    //userAdmin: {type: String,default:'Admin'},//this function repetitive?
    userLevel: 2,//Normal: 1 Super: 2
	//avatar: {type: String, default: 'default.jpg'},
    city: '杭州市',
    district: '下沙区',
    road: '六号大道'
}, {
    username: 'zhangdh',
    password: 1122,
    userId: '0001',
    //userAdmin: {type: String,default:'Admin'},//this function repetitive?
    userLevel: 1,//Normal: 1 Super: 2
	//avatar: {type: String, default: 'default.jpg'},
    city: '杭州',
    district: '下沙区',
    road: '六号大道'
},{
    username: 'guos',
    password: 1122,
    userId: '0002',
    //userAdmin: {type: String,default:'Admin'},//this function repetitive?
    userLevel: 1,//Normal: 1 Super: 2
	//avatar: {type: String, default: 'default.jpg'},
    city: '杭州',
    district: '下沙区',
    road: '六号大道'
}]
var user_init = function(json_data){
    for(var i = 0; i<json_data.length;i++)
        user.UserOp.save(json_data[i],(err)=>{
        if(err){console.log(err+'User initilisation failed!');                
}else{
        console.log('User initilisation succeed!');
    }
});
}
user_init(user_json);