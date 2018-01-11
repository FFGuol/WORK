var fs = require('fs');
var net = require('./net');
var readTxt = require('../public/js/readTxt');
var dao = require('../public/js/queryDao');
var querystring = require('querystring');

readTxt.read("list1.txt", function(data) {
	console.log(data);
	var arr = data.split(",");
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		net.getData(arr[i], function(data) {
			var sources = data.sources;
			for (var i = 0; i < sources.length; i++) {
				var details = sources[i].details;
				var data = details.data;
				for (var j = 0; j < data.length; j++) {
					if (data[j].link) {				
						dao.insertAttach(data[j].link,data[j].title,data[j].des);
					} else {
						var d = data[j].data;
						for (var p = 0; p < d.length; p++) {
							dao.insertAttach(d[p].link,d[p].title,d[p].des);
						}
					}

				}
			}
		});
	}
});





