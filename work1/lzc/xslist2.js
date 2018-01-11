//Pa 某书 .com资源
var net = require('./network/net');
var cheerio = require('cheerio');
var dao = require('../public/js/queryDao');
var parms = {}
var count= 1;
var callback = function (flag,res){
    if(flag){
        //console.log(res);
        var $ = cheerio.load(res);
        var books = [];
        $('.bbox').each(function(){
            try{ 
                var src= '';
                var bookname='';
                var author ='';
                var bookdesc='';

                src = this.children[1].children[0].attribs.src;
                bookname = this.children[3].children[1].children[0].children[0].data;            
                author = this.children[3].children[1].children[1].children[1].children[0].data;
                bookdesc = this.children[3].children[3].children[3].children[0].data;
                
                //console.log(bookname+"--"+src+"--"+author+"--"+bookdesc);
                console.log(bookname);
                //books.push("('"+bookname+"','"+author+"','"+src+"')");
                books.push([bookname,author,src,catalog,bookdesc]);
            }catch(e){
                //console.log(start);
                books.push([bookname,author,src,catalog,bookdesc]);
                console.log('-----------------发生了一个令人痛心的错误-------------------');
            }
        });
        dao.insertxs(books);
    } else {
        console.log("请求失败");
    }
}
var opt = {
    'method':'GET',
    'host':'www.xiabook.com',
    'proxy':'http'
}
//net.netRequest(parms,'/waiguo/index_17.html',callback,opt);var catalog = '世界名著';

var action = '/lz/';
var catalog = '励志书籍';
var start = 1;
var end = 17;


var interval = setInterval(function(){    
    if(start==end){
        clearInterval(interval);
    }
    console.log("-------------"+start+"--------------");
    if(start!=1){
        var ac = action+"index_"+start+".html";
    }else{
        var ac = action+"index.html";
    }
    
    net.netRequest(parms,ac,callback,opt);
    start++;
},1000);
