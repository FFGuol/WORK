//Pa 某书 .com资源
var net = require('./network/net');
var cheerio = require('cheerio');
var dao = require('../public/js/queryDao');
var parms = {}
var callback = function (flag,res){
    if(flag){
        //console.log(res);
        var $ = cheerio.load(res);
        var books = [];
        $('.bk').each(function(){
            try{            
                var src = this.children[1].children[1].children[1].attribs.src;
                var bookname = this.children[3].children[0].children[0].data;
                
                var author = this.children[5].children[1].children[0].data;
                console.log(bookname+"--"+src+"--"+author);
                //books.push("('"+bookname+"','"+author+"','"+src+"')");
                books.push([bookname,src,author,'经典励志书籍']);
            }catch(e){
                //console.log(e);
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
net.netRequest(parms,'/top/lz.html',callback,opt);