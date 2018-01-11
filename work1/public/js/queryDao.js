var pool = require('./pool')
var dao = {
    queryAttachByKey: function (key, callback) {
            var sql = "SELECT * from BOOKS_DB t where t.TITLE like '%" + key + "%' ORDER BY t.HOT DESC LIMIT 0,8";
            console.log(sql);
            pool.getConn(function (connect) {
                connect.query(sql, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    callback(result);
                })

            })
        },
        insertAttach: function (link, title, des) {
            var sql = "INSERT INTO BOOKS (BOOK_NAME,REMOTE_PATH,CREATE_TIME,BOOK_DESC) VALUES ('" + title + "', '" + link + "', SYSDATE(), '" + des + "')";
            pool.getConn(function (connect) {
                connect.query(sql, function (err, result) {
                    if (err) {
                        dao.insertLog(sql);
                    }
                    //callback(result);
                })

            })
        },
        insertLog: function (msg) {
            var sql = "INSERT INTO LOG (EXCEPTION) VALUES (\""+msg+"\")";
            pool.getConn(function (connect) {
                connect.query(sql, function (err, result) {
                    if (err) {
                        return;
                    }
                })

            })
        },
        querydblist: function (catalog_id,callback) {
            var sql = "SELECT t.CATALOG_ID,t.BOOK_COUNT,t.URL FROM CATALOG t WHERE CATALOG_ID NOT IN ( SELECT DISTINCT CATALOG_ID FROM DOUBAN_LIST ) AND URL IS NOT NULL and BOOK_COUNT <> 0 ORDER BY BOOK_COUNT";
            pool.getConn(function (connect) {
                connect.query(sql, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    callback(result);
                })

            })
        },
        insertDbList:function(books){
            var sql = "INSERT INTO DOUBAN_LIST(TITLE,SUB_TITLE,AUTHOR,AUTHOR2,HOT,SHAMPLE_DESC,BOOK_COVER,CATALOG_ID,HTML) VALUES ?";
            var  params = books;
            pool.getConn(function (connect) {
                connect.query(sql, [params],function (err, result) {
                    if (err) {
                        throw err;
                    }
                    //callback(result);
                })

            })
        },
        test:function(){
            var sql = "INSERT INTO pan_check(CRID) VALUES (1)";
            console.log(11);
            pool.getConn(function (connect) {
                console.log(44);
                connect.query(sql,function (err, result) {
                    if (err) {
                        throw err;
                    }
                    //callback(result);
                })

            })

        },
        insertxs:function(books){
            var sql = "INSERT INTO BOOKS_XS(TITLE,AUTHOR,BOOK_COVER,BOOK_CATALOG,BOOK_DESC) VALUES ?";
            var  params = books;
            pool.getConn(function (connect) {
                connect.query(sql, [params],function (err, result) {
                    if (err) {
                        throw err;
                    }
                    //callback(result);
                })

            })

        },
        insertemp:function(books){
            var sql = "INSERT INTO TEMP(TITLE,AUTHOR,SIZE,NAME2) VALUES ?";
            var  params = books;
            pool.getConn(function (connect) {
                connect.query(sql, [params],function (err, result) {
                    if (err) {
                        throw err;
                    }
                    //callback(result);
                })

            })

        }


}
/*
for(var i=0;i<50;i++){
    console.log(i);
    sleep(10000);
    dao.test();
}
function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };*/
module.exports = dao;