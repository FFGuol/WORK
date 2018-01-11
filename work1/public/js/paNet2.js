var cheerio = require('cheerio');  
var request = require('sync-request');  
var fs = require('fs');
var readTxt = require('./readTxt');
//var pool = require('readTxt');

readTxt.read("down.txt",function(data){
  var arr = data.split(",");
  var len = arr.length;
  for(var i=0;i<len;i++){
    search(data[i],function(){

    });
  }
});
function search(bookName,callback){
    var text = encodeURIComponent(bookName);
    url = 'https://www.jiumodiary.com/init_hubs.php?q='+text+'&remote_ip=&time_int=1514122872883';

    var html = '';
    html = request('POST', url).getBody().toString();
    
   console.log(html)
 url = "https://www.jiumodiary.com/ajax_fetch_hubs.php?id=emp0akt5RktpK3Y5QUpWVWx0L1RlQT09&set=0";
html = request('POST', url).getBody().toString();
   console.log(html)
}