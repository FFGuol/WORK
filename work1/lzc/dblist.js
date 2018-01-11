//获取书名等信息
var net = require('./net');
var dao = require('../public/js/queryDao');
var cheerio = require('cheerio');
var request = require('sync-request');
/*
var html = '';
var url = 'https://read.douban.com/kind/515/?sort=hot&promotion_only=False&min_price=None&max_price=None&works_type=None&start=13';
console.log(url);
html = request('GET', url).getBody().toString();
console.log(html);
var $ = cheerio.load(html);
*/


function indb(result) {
    //console.log(result);
    var len = result.length;
    for (var i = 0; i < len; i++) {
        var catalog_id = result[i].CATALOG_ID;
        var book_count = result[i].BOOK_COUNT;
        var url = result[i].URL;
        var start = 0;
        var books = [];
        while (start < book_count) {
            var html = '';
            url2 = url + "&start=" + start;
            console.log(url2);
            html = request('GET', url2).getBody().toString();
            var $ = cheerio.load(html);
            $('.store-item').each(function (i,data) {
                //图片地址
                var href = '';
                var title = '';
                var subTitle = '';
                var author = '';
                var author2 = '';
                var hot = '';
                var dis = '';
                var html = '';
                //console.log(this);
                try {
                        href = this.children[0].children[0].children[0].attribs.src;
                        //console.log(href);
                        var info = this.children[1];
                        var objT = info.children[1];
                        //主标题
                        title = objT.children[0].children[0].data;
                        //console.log(title);
                        //副标题
                        
                        if (objT.children.length > 1) {
                            subTitle = objT.children[1].children[0].data;
                        }
                        //console.log(subTitle);
                        var authorO = info.children[2];
                        author = authorO.children[0].children[1].children[0].children[0].data;
                        //console.log(author);
                        
                        if (authorO.children.length > 1) {
                            author2 = authorO.children[1].children[1].children[0].children[0].data;
                        }
                        //console.log(author2);

                        if (info.children == 4) {
                            dis = info.children[4].children[0].data;
                        } else {
                            if (info.children[4].children.length > 1)
                                hot = info.children[4].children[1].children[0].data;
                                dis = info.children[5].children[0].data;
                        }
                        //console.log(hot);
                        //console.log(dis);
                } catch (err) {
                    html = start;
                }
                /*此处改成批量插入数据语句，一句句插入会重复创建连接，导致连接词爆掉（
                执行完插入操作才会回调关闭连接池，实际上回调的时候已经创建了非常多的连接池，以至于超时异常                             
                try{
                    console.log(title);
                    dao.insertDbList(title,subTitle,author,author2,hot,dis,href,catalog_id,html);
                } catch (err){
                    console.log('title');
                    dao.insertDbList(title,'subTitle','author','author2','hot','dis','href',catalog_id,html);
                } */  
               books.push([title,subTitle,author,author2,hot,dis,href,catalog_id,html]);                        
            })
            if(books.length>1000){
                dao.insertDbList(books);
                books = [];
            }
            start =  start + 20;
        }
        if(books.length>0){
            console.log(books);
            //dao.insertDbList(books);
        }
    }
}
dao.querydblist(102008, indb);