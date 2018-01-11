var uuid = require('./uuid');

function timeuuid(){
    return Date.now()+"_"+uuid(5,16);
}

module.exports = timeuuid;