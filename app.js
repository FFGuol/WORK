// 引用     express 来支持 HTTP Server 的实现上海
const express = require('express');
var util = require('util'); 
// 引用微信公共平台自动回复消息接口服务中间件
var wechat = require('wechat');

// 创建一个 express 实例
const app = express();
var dao = require('./public/js/queryDao');
// 配置微信公众平台参数，在教程第二步中获取
var config = {
    token: 'mytoken', // 填第二步中获取的 `token`
    appid: 'wx7668ebe18b0760cb', // 填第二步中获取的 `appid`
    encodingAESKey: 'NedBerbkHVMIvh4tyb87EzgRTWXoELu6GdEgt94WN91', // 填第二步中获取的 `encodingAESKey`
    checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};
var domain = require('domain');
var d = domain.create();
d.on('error',function(err){
    console.log(err);
});

/*setInterval(function () {
    d.run(sync_error);
    d.run(async_error);
}, 1000)*/

app.use(express.query());
// 返回图文信息
 var sendNewsMsg = function (msg) {
     
  var time = Math.round(new Date().getTime() / 1000);
  var articlesStr = "";
  for (var i = 0; i < msg.articles.length; i++)
  {
    articlesStr += "<item>" +
              "<Title><![CDATA[" + msg.articles[i].title + "]]></Title>" +
              "<Description><![CDATA[" + msg.articles[i].description + "]]></Description>" +
              "<PicUrl><![CDATA[" + msg.articles[i].picUrl + "]]></PicUrl>" +
              "<Url><![CDATA[" + msg.articles[i].url + "]]></Url>" +
            "</item>";
  }
  //var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
  var output = "" +
  "<xml>" +
     "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
     "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
     "<CreateTime>" + time + "</CreateTime>" +
     "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
     "<ArticleCount>" + msg.articles.length + "</ArticleCount>" +
     "<Articles>" + articlesStr + "</Articles>" +
     //"<FuncFlag>" + funcFlag + "</FuncFlag>" +
  "</xml>";
  return output;
}
app.use('/service1', wechat(config, function (req, res, next) { 
    var ToUserName = req.weixin.ToUserName;
    var FromUserName = req.weixin.FromUserName;
    var CreateTime = req.weixin.CreateTime;
    var MsgType = req.weixin.MsgType;
    var Content = req.weixin.Content;
    var msg = {
        toUserName:FromUserName,
        fromUserName:ToUserName,
        msgType:'news',
        articles:[]
    }
    dao.queryAttachByKey(Content,function(result){
        if(result.length>=1){
            for(var i=0;i<result.length;i++){
                msg.articles[i] ={
                    title:result[i].TITLE,
                    description:result[i].SHAMPLE_DESC,                 
                    picUrl:result[i].BOOK_COVER,
                    url:'www.baidu.com'
                }
            }
        }else{
            msg.articles[0] ={
                    title:"这本书暂时我们还没有收录",
                    description:'',                 
                    picUrl:'www.baidu.com',
                    url:'www.baidu.com'
                }
        }
        
        var xml = sendNewsMsg(msg);
        res.type('xml');
        res.send(xml);
    })   
}));
app.use('/service2', function(req, res, next) {
    console.log(`222`);
   
});

// 监听端口，等待连接
const port = 80;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);