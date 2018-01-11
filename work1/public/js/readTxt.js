//异步读取txt文件并执行回调函数
var rf=require("fs"); 
var readTxt={};

readTxt.read = function(fileName,callback){
    rf.readFile(fileName,'utf-8',function(err,data){  
        if(err){  
            console.log("error");  
        }else{  
            //console.log(data); 
            callback(data); 
        }  
    });

}
//readTxt.read('down.txt');
module.exports = readTxt; 