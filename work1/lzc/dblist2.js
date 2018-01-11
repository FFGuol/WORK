//获取书名等信息
// var net = require('./net');
var dao = require('../public/js/queryDao');
var cheerio = require('cheerio');
var request = require('request');
var aasync = require('async');
var co = require('co');
var fs = require('fs');
/*
var html = '';
var url = 'https://read.douban.com/kind/515/?sort=hot&promotion_only=False&min_price=None&max_price=None&works_type=None&start=13';
console.log(url);
html = request('GET', url).getBody().toString();
console.log(html);
var $ = cheerio.load(html);
*/


//懒得改,参数全部往下传
function whileloop(requestTimes,responseTimes,catalog_id,book_count,url,start,books){
    var urls = [];
    console.log("大概有书：  "+book_count)
    while (start < book_count) {           
            var html = '';
            var url2 = url + "&start=" + start;
            start =  start + 20;
            // console.log(url2);
        urls.push(url2);       
        }
    var urlsCount = urls.length;
    //控制并发数以免被403 希望磊哥元旦快乐
    aasync.forEachSeries(urls, function (url, seriescbk) {
        urlsCount --;
        console.log(url);
        
        fetch(url, requestTimes, catalog_id, catalog_id, book_count, books, responseTimes, start, seriescbk, urlsCount);
    }, function (err) {

    });
}


function fetch(url, requestTimes, catalog_id, catalog_id, book_count, books, responseTimes, start, seriescbk, urlsCount) {

    request(url, function (error, response, body) {
        // console.log(error);
         //console.log(response.statusCode);
        // console.log(body);
        if (!error && response.statusCode == 200) {
            //console.log(responseTimes);
            var html = body.toString();
            //console.log(html);
            var $ = cheerio.load(html);
            $('.store-item').each(function (i, data) {
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
                    var authorO = info.children[2];
                    author = authorO.children[0].children[1].children[0].children[0].data;
                    if (authorO.children.length > 1) {
                        author2 = authorO.children[1].children[1].children[0].children[0].data;
                    }
                    if (info.children == 4) {
                        dis = info.children[4].children[0].data;
                    } else {
                        if (info.children[4].children.length > 1)
                            hot = info.children[4].children[1].children[0].data;
                        dis = info.children[5].children[0].data;
                    }
                } catch (err) {
                    html = start;
                } 
                dis = dis.replace(/\'/g,"");
                dis = dis.replace(/\"/g,"");            
                books.push([title, subTitle, author, author2, hot, dis, href, catalog_id, html]); console.log(books.length);
                console.log(title);    
                console.log('okokokoko' + books.length)
                
                // console.log('responseTimes' + responseTimes)
                // console.log('requestTimes' + responseTimes)
            })
            if (urlsCount === 0) {
                //到这里就是最有一页啦
                console.log('爬得好累..现在我们开始插入书')
                console.log('时间是让人猝不及防的东西有 \n 晴时有风阴有时雨一 \n 争不过朝夕点 \n 又念着往昔想 \n 岁月是一场有去无回的旅行磊 \n 好的坏的都是风景哥')
                //console.log(books);
                try{
                    var bookstr = '';
                    for(var j=0;j<books.length;j++){
                        bookstr +='(';
                        for(k=0;k<books[j].length;k++){
                            if(k==books[j].length-1){
                               bookstr += "'" + books[j][k] +"'";
                            }else{
                               bookstr += "'" + books[j][k] +"',";
                            }
                        }
                        if(j==books.length-1){
                            bookstr +=')'; 
                        }else{
                           bookstr +='),'; 
                       }                        
                    }
                    fs.appendFile('books.txt', bookstr, 'utf-8', function(err){
                        if (err) throw err;
                        //else console.log('大体信息写入成功'+'\r\n' + data)
                      });
                    dao.insertDbList(books);                   
                }catch(err){
                    console.log('发生了一个触不及防的错误');
                      fs.appendFile('books.txt', books, 'utf-8', function(err){
                        if (err) throw err;
                        //else console.log('大体信息写入成功'+'\r\n' + data)
                      });
                }
            }
            // if (responseTimes == requestTimes) {
            //     // console.log(books);
            //     dao.insertDbList(books);
            //     console.log('insert boooooooook')
            // }
        }
        seriescbk();
    }); 
}


function indb(result) {
    //console.log(result);
    var len = result.length;
    var requestTimes = 0;
    var responseTimes = 0;
    for (var i = 0; i < 1; i++) {
        var catalog_id = result[i].CATALOG_ID;
        var book_count = result[i].BOOK_COUNT;
        var url = result[i].URL;
        var start = 0;
        var books = [];
        requestTimes = Math.ceil(book_count/20);
        whileloop(requestTimes, responseTimes, catalog_id, book_count, url, start, books)
    }
}

//线程关系暂时先手动改,后面再优化自动控制
/*
var num = 0;
var interval = setInterval(function(){
    num++;
    if(num==4){
        clearInterval(interval);
    }
    console.log("-------------"+num+"--------------");
    dao.querydblist('311005', indb);
},120000);
*/
dao.querydblist('201004', indb);

