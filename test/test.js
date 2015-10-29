var os = require('os');
//获取内网ip
function getLocalIP() {
    var map = [];
    var ifaces = os.networkInterfaces();
    console.log(ifaces);
    for (var dev in ifaces) {
        if (dev.indexOf('以太网') != -1) {
            return ifaces[dev][1].address;
        }
    }  
    return map;
}

console.log(getLocalIP())