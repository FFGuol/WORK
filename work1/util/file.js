var fs = require('fs');
var p = 0;
fs.readFile('../../books/bookxs/世界名著/1515249875690_0778F.txt', 'utf-8', function (err, data) {
        var start = data.indexOf("《");
        var end = data.indexOf("》");
        var title = data.substr(start+1,end-1-start);
        console.log(title);
    })
    // console.log('--------读取结束--------');
