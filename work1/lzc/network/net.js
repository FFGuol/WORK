/**
 * 重新封装的网络请求
 */

var http = require('http');
var https = require('https');
var querystring = require('querystring');
var net = {}

//ip或域名
var host = "www.jiumodiary.com";
/**
 * 
 * @param {接口需要的参数,是一个对象} params 
 * @param {异步回调函数} callback 
 * @param {接口地址} action 
 * @param {请求配置,可选参数,默认请求为https+post} opt 
 */
function netRequest(params, action, callback, opt={}) {
    var config = {};
    //这里默认使用POST请求,假如磊哥想要使用GET请求可以加上opt参数的method属性
    config.method = opt["method"] === undefined ? 'POST' : 'GET';
    //这里默认使用https协议,假如磊哥想要使用http,可以加上opt参数的proxy属性
    config.proxy = opt["proxy"] === undefined ? https : http;
    //这里单独封装的了一个GET请求,假如磊哥想使用另外一种GET请求可以加上opt参数的haha属性
    config.type = opt["haha"] === undefined ? true : false;
    config.host = opt["host"] === undefined ? host : opt["host"];
    config.referer = config.proxy == https ? 'https://'+config.host : 'http://'+config.host ;
    config.origin = config.referer;
    config.params = querystring.stringify(params);
    if (config.type) {
        config.action = action;
        commonRequest(config, callback);
    }else{
        config.action = action + config.params;
        httpRequest(config, callback);
    }
}

/**
 * 用于http/https + post/get请求
 * @param {请求的配置} config 
 * @param {回调} callback 
 */
function commonRequest(config,callback) {    
    var option = {
        host: config.host ,
        method: config.method,
        path: config.action,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": config.params.length,
            "Referer": config.referer,
            "Origin": config.origin,
            "X-Requested-With": 'XMLHttpRequest',
        }
    }
    var result = '';
    var req = config.proxy.request(option, (res) => {
        res.on('data',(data)=>{
            result += data;
        })
        .on('end',()=>{
            // console.log(result)
            callback(true, result);
        })
        .on('error',(err)=>{
            console.log(err.message);
             callback(false, err.message);
        })
    });
    req.write(config.params);
    req.end();
}

/**
 * 用于https/http get请求返回
 * @param {请求配置} config 
 * @param {回调函数} callback 
 */
function httpRequest(config,callback) {
    var pre = config.proxy === https ? 'https://' : 'http://';
    var url = pre + config.host  + config.action
    console.log(url);
    config.proxy.get(url,(res)=>{
        var result = '';
        res.on('data',(res)=>{
            result += res;
        })
        .on('end',(res)=>{
            // console.log(result)
            callback(true, result);
        })
        .on('error',(err)=>{
            console.log(err.message)
            callback(false, err.message);
        })
    })
}

net.netRequest = netRequest;

module.exports = net;

//test();
function test(){
    //这里是一个例子
    var date = new Date().getTime();
    //参数
    var params = {
        q: 'java',
        remote_ip: "",
        time_int: date
    };
    //接口  http://www.www.jiumodiary.com/init_hubs.php?  中的  /init_hubs.php?
    var action = '/init_hubs.php?'

    //默认的网络请求
    netRequest(params, action,(success,res)=>{
        console.log(res)
    })

    var opt = {};
    opt = {haha:'haha'}
    netRequest(params, action, (success, res) => {
        console.log(res)
    }, opt)
}
