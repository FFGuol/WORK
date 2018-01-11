var http = require('http');
var https = require('https');
var cheerio = require('cheerio')
var querystring = require('querystring');

var net = {}
net.getData = function (bookName, callback) {
    getId(bookName, callback);
}

function getDataList(obj, callback) {

    var id = obj["id"];
    var data = {
        id: id,
        set: obj.count
    };
    data = querystring.stringify(data);
    var opt = {
        host: 'www.jiumodiary.com',
        method: 'POST',
        path: '/ajax_fetch_hubs.php',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length,
            "Referer": 'https://www.jiumodiary.com',
            "Origin": 'https://www.jiumodiary.com',
            "X-Requested-With": 'XMLHttpRequest',
        }
    }
    var body = '';
    var req = https.request(opt, function (res) {
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            callback(JSON.parse(body));
        });
    }).on('error', function (e) {
        console.log("error: " + e.message);
    })
    req.write(data);
    req.end();
}


function getId(bookName, callback) {
    var date = new Date().getTime();
    var url = 'https://www.jiumodiary.com/init_hubs.php?';
    var parameter = {
        q: bookName,
        remote_ip: "",
        time_int: date
    };
    parameter = querystring.stringify(parameter);
    url = url + parameter;
    //console.log(url)
    var obj = {};
    https.get(url, (res) => {
        var rsp = ''
        res.on('data', (data) => {
            rsp += data
        })
        res.on('end', () => {
            obj = JSON.parse(rsp)
            //console.log(obj);
            //console.log('请稍等...正在根据id查数据')
            getDataList(obj, callback)
        }).on('error', () => {
            console.log('获取数据失败')
        })
    })
}
module.exports = net;