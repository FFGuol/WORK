var http = require('http');
var https = require('https');
var cheerio = require('cheerio')

var option={
    hostname:'pan.baidu.com',
    path:'/s/1dEHwFo1#list/path=%2F',
    headers:{
      'Accept':'*/*',
      'Accept-Encoding':'utf-8', 
      'Accept-Language':'zh-CN,zh;q=0.8',
      'Connection':'keep-alive',
      'Cookie':'bdshare_firstime=1428481884960; BIDUPSID=83B884442F66E73F83F11CD60FFBD3A4; secu=1; BAIDUID=7D889DFC640AE89BDD7D8656BFA8316E:FG=1; PSTM=1489249843; FP_UID=174225d92a9a2a7c9e3bf65e147e94e9; panlogin_animate_showed=1; PANWEB=1; FP_LASTTIME=1503295387984; Hm_lvt_f5f83a6d8b15775a02760dc5f490bc47=1511698508; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BDCLND=pP8rporAcqP%2BWB0P7%2BVpRWfKDxYYlXkdj64scvWlySs%3D; recommendTime=android2017-12-21%2017%3A20%3A00; BDSFRCVID=keFsJeCCxG3wbibAh_Q-b0s4IQmm7Y5SS3lS3J; H_BDCLCKID_SF=JbufoC0htIvbfP0kMtcohPJH-UnLqhcPW67Z0l8KtD3WOIJLjUQsBpIO5bJl-MQhLaOCKKOmWIQHDIjC0h6aKJIFyxbU5f5k02Q4KKJx-4PWeIJo5DcvQxnBhUJiB5JLBan7_noxfDDbbDt6jjD3-PAe5f8X-PQXKKTXLTrJabCQe4ovhJbo5JDSbHcM-bT2b-_HoK-XJKL_hC8mejt-q6jyjauftjnW5mceaJ5n0-nnhP3PMt5NMh4uqfKjb53ALCjL_MIaLM85DM8Ry66jK4JKDHtqtTjP; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1513236360,1513262709,1513930498,1514005053; pan_login_way=1; STOKEN=d9ae1236308bd6bd5482b8476be8af1ff72c6cb5dab8917d42a0e89e10d1a0c9; SCRC=e1380a4cee95346a4354245da8106050; PANPSC=12561385306207933126%3AtppTMvTkRvrdAI6mhhc218FSxFVW4BtgU%2BTn05CCUyPKNvpHmWMFFxOAD5r1J1nbLcWKIdy8DqPYFhp5FlfH1vnjErjjr2%2Fni9bdF0vM4RG%2FYCuu9v6mREphlPHZfTj2crehyGndI5tlVnBz%2FZp9zD4wgdQ%2F1cWMmgeUfIab6RA1jwuzSnCYVQe6OVID6DFBsHHN9wux3JA%3D; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1514014602; H_PS_PSSID=1466_21111_25438_25177_20928; PSINO=7',
      'Host':'pan.baidu.com',
      'Referer':'https://m.baidu.com/tcx?appui=alaxs&page=detail&gid=4305265392&from=dushu'
    }
  };

https.get(option,(res)=>{
	var html = '';
	res.on('data',(data)=>{
		console.log('on data ')
		html += data
	})
	res.on('end',(res)=>{
		console.log(html);
	})
})

//拿到 yunData 剩下node.js 做请求不过只能拿到分享第一个文件的下载地址

// $.ajax({
// type: "POST",
// url: "/api/sharedownload?sign="+yunData.SIGN+"&timestamp="+yunData.TIMESTAMP,
// data: "encrypt=0&product=share&uk="+yunData.SHARE_UK+"&primaryid="+yunData.SHARE_ID+"&fid_list=%5B"+yunData.FS_ID+"%5D",
// dataType: "json",
// success: function(d){ 
// console.log(d.list[0]. dlink)
// }
// });
