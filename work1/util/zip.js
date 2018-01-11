var zlib = require('zlib');
var async = require('async');

function gzip(text){
    var buf = new Buffer(text);

    var zipRes = null;

    async.auto({
        zip:function(cb){
            zlib.gzip(buf,function(err,res){
                zipRes = res;
                cb(err,res);
            })
        },
        unzip:['zip',function(cb,res){
            var zipRes = res.zip;

            zlib.unzip(zipRes,function(err,res){
                cb(err,res.toString());
            })
        }]

    },function(err,res){

        console.log(zipRes);
        console.log(res.unzip);
    })
}


function deflate(text){
    var buf = new Buffer(text);

    var deflateRes = null;

    async.auto({
        zip:function(cb){
            zlib.deflate(buf,function(err,res){
                deflateRes = res;
                cb(err,res);
            })
        },
        unzip:['zip',function(cb,res){
            var zipRes = res.zip;

            zlib.unzip(zipRes,function(err,res){
                cb(err,res.toString());
            })
        }]

    },function(err,res){

        console.log(deflateRes);
        console.log(res.unzip);
    })
}


gzip('zjw');
deflate('zjw');
//
//var buf  = new Buffer('zjw');
//zlib.gzip(buf,function(err,zipRes){
//    console.log(zipRes);
//
//    zlib.unzip(zipRes,function(err,unzipRes){
//
//        console.log(unzipRes.toString());
//    })
//});
//
//
//
//zlib.deflate(buf,function(err,zipRes){
//
//    console.log(zipRes);
//
//    zlib.unzip(zipRes,function(err,unzipRes){
//        console.log(unzipRes.toString())
//    })
//});