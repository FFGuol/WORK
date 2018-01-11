var http = require('http')
const https = require('https');
var fs = require('fs')
var BufferHelper = require('./bufferhelper');
var iconv = require('iconv-lite');
var url = 'https://nbct01.baidupcs.com/file/807b9029ca3ff5ca5ce2738d69dc25d5?bkt=p3-1400807b9029ca3ff5ca5ce2738d69dc25d5fb58c6fb000000000118&fid=2454457810-250528-523154995620745&time=1513003988&sign=FDTAXGERLQBHSK-DCb740ccc5511e5e8fedcff06b081203-2b4zOHM%2BWxqpGiPGXVCSjU5khPk%3D&to=67&size=280&sta_dx=280&sta_cs=2&sta_ft=txt&sta_ct=0&sta_mt=0&fm2=MH,Yangquan,Anywhere,,shanghai,ct&vuk=2454457810&iv=0&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=1400807b9029ca3ff5ca5ce2738d69dc25d5fb58c6fb000000000118&sl=79364174&expires=8h&rt=sh&r=469007490&mlogid=8000447117044431044&vbdid=379447118&fin=%E4%B8%BB%E6%9C%BA%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.txt&fn=%E4%B8%BB%E6%9C%BA%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.txt&rtype=1&dp-logid=8000447117044431044&dp-callid=0.1.1&hps=1&tsl=100&csl=100&csign=YQWJGNn%2BtzWhQKBt4dyNqY3piAY%3D&so=0&ut=6&uter=4&serv=0&uc=3478744561&ic=123375703&ti=30d6448c0d8fb007e61aa751d6be6ed4c4c40cae32938049&by=themis';
https.get(url, function (response) {
    response.setEncoding('binary');  //二进制binary
    var bufferHelper = new BufferHelper();
    response.on('data', function (data) {    //加载到内存
        bufferHelper.concat(data);
    }).on('end', function () { 
        var txt =   iconv.decode(bufferHelper.toBuffer().toString(), 'gb2312');       //加载完
        fs.writeFile('./down.txt',  txt,             function () {
            console.log('ok')
            console.log(txt);
        });
    })
})