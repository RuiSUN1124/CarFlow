#车流量数据开放接口说明
##目博科技
公司服务器提供车流量数据，数据以应用程序语言接口（API）的方式发布。该API与公司数据库相连接，支持Restful Web Service，能对合法的Restful请求反馈，回应车流量数据，传输数据格式为Xml。
服务器开放特定IP地址的特定端口，监听潜在的客户请求。
##客户方
需要正确发起符合Restful接口规范的HTTP请求，并能够正确接受内容为xml数据格式的数据包。
##数据格式
接受Xml路口流量数据， Xml格式如下：
```
<?xml version="1.0" encoding="UTF-8" ?>
<CrossTrafficData>
    <CrossID>路口编号</CrossID> 
    < DeviceType >设备类型</ DeviceType >  
    <DateTime>检测截止时间</DateTime>
    <Interval>统计时长（数据粒度）</Interval>
    <DataList>
    <!--流量列表-->
        <Data>
            <LaneNo>车道号</LaneNo>
            <Volume>交通流量</Volume>
            <AvgOccupancy>平均占有时间</AvgOccupancy>
            <AvgHeadTime>平均车头时距</AvgHeadTime>
            <AvgLength>平均车长</AvgLength>
            <AvgSpeed>平均速度</AvgSpeed>
            <Saturation>饱和度</Saturation>
            <Density>密度</Density>
            <Pcu>当量小汽车</Pcu>
            <AvgQueueLength>平均排队长度</AvgQueueLength>
            <Volume1>微小车辆数量</Volume1>
            <Volume2>小车数量</Volume2>
            <Volume3>中车数量</Volume3>
            <Volume4>大车数量</Volume4>
            <Volume5>超大车数量</Volume5>
        </Data>
       </DataList>
</CrossTrafficData>
```
##路口流量数据对象描述参考
下表仅为设备端发送数据格式参考，与开放的数据不同。

| 序号 | 元素名 | 说明 | 取值 | 长度 | 可空 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | CrossID | 路口编号 | String | 8 | 否 |   |
| 2 | DeviceType | 设备类型 | String | 1 | 否 | 地磁检测器直接填值为B |
| 3 | DateTime | 检测截止时间 | String | 20 | 否 | 格式为：YYYY-MM-DD HH:MM:SS |
| 4 | Interval | 统计时长 | SHORT |   | 否|单位为秒，一分钟填写60，如果是实时数据，填写0 |   |
| 5 | LaneNo | 车道号 | String | 3 | 否 |   |
| 6 | Volume | 交通流量 | SHORT |   | 否 | 单位为辆 |
| 7 | AvgOccupancy | 平均占有时间 | SHORT |   | 否 | 单位为毫秒 |
| 8 | AvgHeadTime | 平均车头时距 | SHORT |   | 是 | 单位为毫秒 |
| 9 | AvgLength | 平均车长 | FLOAT |   | 是 | 单位为米 |
| 10 | AvgSpeed | 平均速度 | FLOAT |   | 是 | 单位为KM/H，要求小数点后保留两位 |
| 11 | Saturation | 饱和度 | BYTE |   | 是 | 百分率，取值0-100 |
| 12 | Density|密度 | SHORT |   | 是 | 单位为辆/KM |   |
| 13 | Pcu | 当量小汽车 | SHORT |   | 是 |   |
| 14 | AvgQueueLength | 平均排队长度 | FLOAT |   | 是 | 单位为米，要求小数点后保留两位 |
| 15 | volume1 | 微小车辆数量 | SHORT |   | 是 |   |
| 16 | Volume2 | 小车数量 | SHORT |   | 是 |   |
| 17 | Volume3 | 中车数量 | SHORT |   | 是 |   |
| 18 | Volume4 | 大车数量 | SHORT |   | 是 |   |
| 19 | Volume5 | 超大车数量 | SHORT |   | 是 |   |












##接口使用说明
目前提供指定的appid，appkey和secret作为认证(以下称为Authen)，不可泄露。
要求客户端发起基于HTTP的GET请求(如以客户方浏览器为客户端)可访问以下接口：

* 访问所有车流量数据
`GET: /api/<Authen>/all`

* 访问近一周车流量数据
`GET: /api/<Authen>/near`

* 访问指定路口(crossID)即指定网关所有车流量数据
`GET: /api/<Authen>/cross/<crossID>` 

* 访问指定路口(crossID)即指定网关近3分钟实时车流量数据
`GET: /api/<Authen>/cross/<crossID>/last3min` 

* 访问指定路口(crossID)即指定网关一段时间车流量数据
`GET: /api/<Authen>/cross/<crossID>/start=<startTime>&end=<endTime>` 

##URL实例
访问指定路口(crossID)即指定网关一段时间车流量数据
举例：获取crossID为11111111的2017-07-01 07:39:00到2017-07-01 17:39:15的车流量数据
`http://<Address>:<Port>/api/<Authen> /cross/11111111`
`/start=2017-07-01 07:39:00&end=2017-07-01 17:39:15`

