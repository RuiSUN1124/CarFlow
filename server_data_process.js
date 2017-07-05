//2016-6-13
//每一帧可能有多个包，每个帧有且只有一个13bytes的head
// CrossID 	: 31 32 33 34 35 36 37 38    	     共 8byte
// 	PacketType	: 01                          	  	1byte
// 	PacketInfo	: 01 00 00 00 				4byte
//  每个帧有且只有一个检错1byte和生产商编码1byte的尾

//以上： a socket contains 15 + n*59 bytes 

var net = require('net');
var CarFlow = require('./models/Flow.js');
var server = net.createServer();
var num_socket = 0;
var num_packet = 0;
var socket_length = 0;
server.on('connection',(socket) => {
    num_socket = num_socket + 1;
    socket.write('Hello');
    console.log('Bien connection '+ num_socket+' time');
    // if lose data, despite of data length, how could we know the correction. 
   
    //setTimeout(function() {
        socket.on('data',(data)=>{   
        socket_length = socket.bytesRead;
        if((socket_length-15)%59 != 0){
            console.log('Received ',socket_length,' bytes data');
            console.log('Number of array byte incorrect, please resend!');
        }else{
             console.log('Received ',socket_length,' bytes data successfully');
             num_packet = (socket_length - 15) / 59;
        }
    //test bytes stream
        data.forEach((d,index)=>{
            console.log(index+'\'s value is '+d);
        });

        //var CrossID
        var str_crossid = new String();
        for(var i = 0; i< 8; i++){
            str_crossid = str_crossid+String.fromCharCode(data[i]);
        }
        console.log('-Cross ID: ',str_crossid);

        // //var PacketType
        // var packet_type = data
        // //var PacketInfo
        // var packet_info = data

//Packet data
        for(var k = 0; k < num_packet; k++){
        //Interval

            console.log('==================Packet '+k+' Data '+'======================');
            var buf_interval = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_interval[i] = data[14+59*k+i]; 
            }
            console.log('-interval: '+buf_interval.readUInt16LE(0));
            // var interval = data[14 + 59*k]+data[15 + 59*k]*256;
            // console.log('-Interval: ',interval);

        //var DeviceType
            var device_type = new String();
            device_type = String.fromCharCode(data[13 + 59*k]);
            console.log('-Device Type: ',device_type);

        //var LaneNo
            var lane_no = new String();
            for(var i = 16 + 59*k; i < 19 + 59*k; i++){
                lane_no  = lane_no + String.fromCharCode(data[i])
            }
            console.log('-Lane Nomber: ',lane_no);
        
        //var DateTime
            var str_date_time = new String();
            for(var i = 19 + 59*k; i < 38 + 59*k; i++){
                str_date_time  = str_date_time + String.fromCharCode(data[i]);
            }
            var date_time = new Date(str_date_time);
            console.log('-Date Time(ISO standard)：',date_time.toString());
            console.log(' Date Time(String): ',str_date_time);

            //var Volume
            var buf_v = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v[i] = data[39 + 59*k + i]; 
            }
            console.log('-Volume: '+buf_v.readUInt16LE(0));
            
            //var Volume1                   
            
            var buf_v1 = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v1[i] = data[41 + 59*k + i]; 
            }
            console.log('-Volume1: '+buf_v1.readUInt16LE(0));
            
            //var Volume2
            var buf_v2 = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v2[i] = data[43 + 59*k + i]; 
            }
            console.log('-Volume2: '+buf_v2.readUInt16LE(0));
            
            //var Volume3
            var buf_v3 = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v3[i] = data[45 + 59*k + i]; 
            }
            console.log('-Volume3: '+buf_v3.readUInt16LE(0));
            
            //var Volume4
            var buf_v4 = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v4[i] = data[47 + 59*k + i]; 
            }
            console.log('-Volume4: '+buf_v4.readUInt16LE(0));
            
            //var Volume5
            //var volume5 = data[49]+data[50]*256;
            //console.log('-Volume5: ',volume5);
            var buf_v5 = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_v5[i] = data[49 + 59*k + i]; 
            }
            console.log('-Volume5: '+buf_v5.readUInt16LE(0));

            //var AveOccupancy
            // var ave_occup = data[51] + data[52]*256;
            // console.log('-AveOccupany: ',ave_occup);     
            var buf_ave_occup = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_ave_occup[i] = data[51 + 59*k + i]; 
            }
            console.log('-AveOccupany: '+buf_ave_occup.readUInt16LE(0));
            
            //var AveHeaderTime
            var buf_ave_header = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_ave_header[i] = data[53 + 59*k + i]; 
            }
            console.log('-AveHeaderTime: '+buf_ave_header.readUInt16LE(0));
           
            //var Avelength
            var buf_avg_l = new Buffer(4);
            for(var i = 0; i <= 3; i++){
                buf_avg_l[i] = data[55+59*k+i];
            }
            console.log('-AveLength: '+ buf_avg_l.readFloatLE(0));

            //var  AveSpeed
            var buf_avg_s = new Buffer(4);
            for(var i = 0; i <= 3; i++){
                buf_avg_s[i] = data[59+59*k+i];
            }
            console.log('-AveSpeed: '+buf_avg_s.readFloatLE(0));

            //var Saturation
            var saturation = data[63+59*k];
            console.log('-Saturation: ',saturation);

            //var Density
            var buf_den = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_den[i] = data[64 + 59*k + i]; 
            }
            console.log('-Density: '+buf_den.readUInt16LE(0));

            //var Pcu
            // var pcu = data[66] + data[67]*256;      
            // console.log('-pcu: ',pcu);

            var buf_pcu = new Buffer(2);
            for(var i = 0; i<=1; i++){
                buf_pcu[i] = data[66 + 59*k + i]; 
            }
            console.log('-PCU: '+buf_pcu.readUInt16LE(0));

            //var AvgQueueLength
            var buf_ave_ql = new Buffer(4);
            for(var i = 0; i <= 3; i++){
                buf_ave_ql[i] = data[68+59*k+i];
            }
            console.log('-AveQueueLength: '+ buf_ave_ql.readFloatLE(0));

            console.log('==================Packet '+k+' Data Fini'+'=================='); 
        
            var packet_json  =  {crossID:str_crossid,
                                interval: buf_interval.readUInt16LE(0),
                                deviceType: device_type,
                                laneNo: lane_no,
                                dateTime: str_date_time,
                                volume: buf_v.readUInt16LE(0),
                                volume1: buf_v1.readUInt16LE(0),
                                volume2: buf_v2.readUInt16LE(0),
                                volume3: buf_v3.readUInt16LE(0),
                                volume4: buf_v4.readUInt16LE(0),
                                volume5: buf_v5.readUInt16LE(0),
                                aveOccup: buf_ave_occup.readUInt16LE(0),
                                aveHeader: buf_ave_header.readUInt16LE(0),
                                aveLength: buf_avg_l.readFloatLE(0),
                                aveSpeed: buf_avg_s.readFloatLE(0),
                                saturation: saturation,
                                density: buf_den.readUInt16LE(0),
                                pcu: buf_pcu.readUInt16LE(0),
                                aveQueue: buf_ave_ql.readFloatLE(0),
                                //test order
                                Num_packet: k  
                                };
        //convert to string
        //   console.log(JSON.stringify(packet_json));

        //因为是异步，所以save succeed出现在check succeed后面，Num_packet就是用来确定一个帧发送多个内容相同的包，
        //收到的是多个不同的包而不是一个包收多次。 这么做是测试客户端的缺陷（发多包只能内容一样的）。
        CarFlow.save(packet_json,(err)=>{
            if(err){console.log('save failed')}else{
                console.log('save succeed');
            }
        });
        
        }
        
        //var ManufacturerCode	    
        var manu_code = data[socket_length - 2];
        console.log('-ManufacturerCode: '+ manu_code);

        //var CheckCode
        var check_code = data[socket_length - 1];
        console.log('-CheckCode: '+ check_code);

        //check 
        var check_correct = data[13];
       for(var i = 14; i<=socket_length-3;i++){
            check_correct ^= data[i];  
       } 
        console.log('Check result: ',check_correct);
        console.log('Check succeed: ',(check_code==check_correct)?'Yes':'No');        
         });
    //}, 100);    
});
server.listen(4001);
console.log('Server started,listening port 4001:...');