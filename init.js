var init_device = require('./inits/init_device.js');
var init_gate = require('./inits/init_gate.js');
var init_user = require('./inits/init_user.js');
var init_record = require('./inits/init_record.js');

init_device.deviceinit();
init_gate.gateinit();
init_record.recordinit();
init_user.userinit();