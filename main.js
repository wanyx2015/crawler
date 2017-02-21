// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var qq = require('./qq_cb');
var fs = require("fs"); // 流

var dburl = 'mongodb://localhost:27017/stock';

var json = {};
var log = console.log;
var db;

var combineObj = function (a, b) {
    var c = {};
    for (var key in a) {
        c[key] = a[key];
    }
    for (var key in b) {
        c[key] = b[key];
    }
    return c;
}

function findDocument(db, collection, callback) {
    // Get the documents collection
    var coll = db.collection(collection);

    // Find some documents
    coll.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found documents: " + docs.length);
        callback(docs);
        console.log();
    });
};

function existsInDB(docs, symbol) {
    log("Finding " + symbol + " in collections...")
    for (i in docs) {
        if (docs[i].name.indexOf(symbol) != -1) {
            log("Matching found: " + doc[i].name)
            return true;
        }
    }
    log("No matching found!")
    return false;
}

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    //    .forBrowser('firefox')
    .forBrowser('phantomjs')
    // .forBrowser('chrome')
    // .usingServer('http://localhost:4444/wd/hub')
    .build();

// var chrome = require('selenium-webdriver/chrome');

driver.manage().window().maximize();
driver.manage().deleteAllCookies();

function connectDB() {

    MongoClient.connect(dburl, function (err, conn) {
        assert.equal(err, null);
        console.log("Connected with the mongodb.");
        db = conn;
    })
}

var url, xpath;


var symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410'];

var years = [2016, 2015, 2014, 2013, 2012, 2011, 2010];
years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]
    //years = [2016]

var jobList = [];
var job;

connectDB();

fs.readFile('./all_symbols_qq.txt', function (err, data) {
    log("Reading file...");
    if (err) throw err;


    //////////////////////
    symbols = data.toString().split('\n');
    //    symbols = ['000535', '600410'];
    //////////////////////


    //    PREPARING THE JOB LIST
    for (i in symbols) {
        for (j in years) {
            if (symbols[i].length > 0) {
                jobList.push({
                    symbol: symbols[i].trim(),
                    year: years[j]
                })
            }
        }
    }


    log("Num of symbols: " + symbols.length);
    log("Num of jobs: " + jobList.length);


    //START THE JOB
    processSymbols();
});


function processSymbols() {


    job = jobList.shift();
    var symbol = job.symbol;
    var year = job.year;



    log("Processing " + symbol + ", " + year + ", pending job number: " + jobList.length);

    qq.assetSheet(symbol, year, function (data) {


        if (data == null) {

            //ERROR HANDLING
            log("------------------------------ in main's inst callback error");
            if (jobList.length > 0) {
                setTimeout(processSymbols, 1000);
            }
            return;
        }


        log("------------------------------ in main's inst callback");

        var symbol = job.symbol;
        var year = job.year;


        checkDB(data.symbol, function (docs) {
            if (docs.length == 0) {
                // NO RECORDS, STORE THE DATA FOR THE FIRST TIME
                insertDB(data);
            } else {
                //UPDATE THE RECORD
                assert(docs.length == 1)
                updateDB(docs[0], 'asset', year, data)
            }

            if (jobList.length > 0) {
                setTimeout(processSymbols, 1000);
            }
        });

        //            qq.inst(symbols[idx], years[year], function (data) {
        //                log("------------------------------ in main's inst callback");
        //                log(data);
        //                return;
        //            });

        //            qq.cashflowSheet(symbols[idx], years[year], function (data) {
        //                log("------------------------------ in main's inst callback");
        //                log(data);
        //                return;
        //            });
    });
}

function checkDB_old(symbol, callback) {
    MongoClient.connect(dburl, function (err, db) {
        assert.equal(err, null);
        console.log("Connected with the mongodb.");

        db.collection('stocks').find({
            symbol: symbol
        }).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found: " + docs.length + " records");
            //            log(docs);
            db.close();
            callback(docs);
        })
    })
}

function checkDB(symbol, callback) {
    console.time("checkDB " + symbol);
    db.collection('stocks').find({
        symbol: symbol
    }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found: " + docs.length + " records");
        //            log(docs);
        //            db.close();
        callback(docs);
        console.timeEnd("checkDB " + symbol);
    })
}


function insertDB_old(json, callback) {
    MongoClient.connect(dburl, function (err, db) {
        var coll = db.collection("stocks")

        coll.insertOne(json, function (err, result) {
            assert.equal(err, null);
            console.log("After insertion: ");
            //            console.log(result.ops);

            coll.find({
                symbol: json.symbol
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("Found: " + docs.length + " records");
                //                console.log(docs);
                db.close();

            })
        })
    });
}


function insertDB(json, callback) {
    var coll = db.collection("stocks")

    coll.insertOne(json, function (err, result) {
        assert.equal(err, null);
        console.log("After insertion: ");
        //            console.log(result.ops);

        coll.find({
            symbol: json.symbol
        }).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found: " + docs.length + " records");
            //                console.log(docs);
            //                db.close();
        })
    })
}


function updateDB_old(dbdoc, type, year, json) {

    var type = 'asset';

    log("ID: " + dbdoc._id + " Symbol: " + dbdoc.name);

    if (dbdoc[type] == null) {

        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + type + " not found! inserting into db now......")
            //        dbdoc[type] = json[type];

        // updatedb
        MongoClient.connect(dburl, function (err, db) {
            assert.equal(err, null);
            console.log("Connected with the mongodb.");

            var coll = db.collection('stocks');
            coll.findOneAndUpdate({
                _id: dbdoc._id
            }, {
                $set: {
                [type]: json[type]
                }
            }, function (err, r) {
                assert.equal(null, err);
                //            test.equal(1, r.lastErrorObject.n);
                //            test.equal(1, r.value.b);
                //            test.equal(1, r.value.d);
                coll.find({
                    symbol: dbdoc.symbol
                }).toArray(function (err, docs) {
                    assert.equal(err, null);
                    console.log("Found: " + docs.length + " records");
                    //                    log(docs);
                    db.close();
                    //                    callback(docs);
                });
            });
        });
        // end of updatedb

    } else {

        for (date in dbdoc[type]) {

            var pendingDate = Object.keys(json[type])[0];
            var pendingYear = Object.keys(json[type])[0].split("-")[0];
            log("date: " + date)
            log("pendingYear " + pendingYear);
            log("date.indexOf(pendingYear): " + date.indexOf(pendingYear));
            //            log(dbdoc[type])
            //            log(dbdoc[type][date])


            if (date.indexOf(pendingYear) > -1) {
                log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! type and date MATCHED! Skip...... date = " + date)
            } else {
                log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! type MATCHED but date not MATCHED! Updating...... date = " + date)

                dbdoc[type][pendingDate] = json[type][pendingDate]
                dbdoc[type] = combineObj(dbdoc[type], json[type])

                // updatedb
                MongoClient.connect(dburl, function (err, db) {
                    assert.equal(err, null);
                    console.log("Connected with the mongodb.");

                    var coll = db.collection('stocks');
                    coll.findOneAndUpdate({
                        _id: dbdoc._id
                    }, {
                        $set: {
                            [type]: dbdoc[type]
                        }
                    }, function (err, r) {
                        assert.equal(null, err);
                        //            test.equal(1, r.lastErrorObject.n);
                        //            test.equal(1, r.value.b);
                        //            test.equal(1, r.value.d);
                        coll.find({
                            symbol: dbdoc.symbol
                        }).toArray(function (err, docs) {
                            assert.equal(err, null);
                            console.log("Found: " + docs.length + " records");
                            //                            log(docs);
                            db.close();
                            //                            callback(docs);
                        });
                    });
                });
                // end of updatedb                    
            }
        }
    }

}


function updateDB(dbdoc, type, year, json) {

    var type = 'asset';

    log("ID: " + dbdoc._id + " Symbol: " + dbdoc.name);

    if (dbdoc[type] == null) {

        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + type + " not found! inserting into db now......")
            //        dbdoc[type] = json[type];

        // updatedb
        assert.equal(err, null);
        console.log("Connected with the mongodb.");

        var coll = db.collection('stocks');
        coll.findOneAndUpdate({
            _id: dbdoc._id
        }, {
            $set: {
                [type]: json[type]
            }
        }, function (err, r) {
            assert.equal(null, err);
            //            test.equal(1, r.lastErrorObject.n);
            //            test.equal(1, r.value.b);
            //            test.equal(1, r.value.d);
            coll.find({
                symbol: dbdoc.symbol
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("Found: " + docs.length + " records");
                //                    log(docs);
                //                db.close();
                //                    callback(docs);
            });
        });
        // end of updatedb

    } else {

        for (date in dbdoc[type]) {

            var pendingDate = Object.keys(json[type])[0];
            var pendingYear = Object.keys(json[type])[0].split("-")[0];
            log("date: " + date)
            log("pendingYear " + pendingYear);
            log("date.indexOf(pendingYear): " + date.indexOf(pendingYear));
            //            log(dbdoc[type])
            //            log(dbdoc[type][date])


            if (date.indexOf(pendingYear) > -1) {
                log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! type and date MATCHED! Skip...... date = " + date)
            } else {
                log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! type MATCHED but date not MATCHED! Updating...... date = " + date)

                dbdoc[type][pendingDate] = json[type][pendingDate]
                dbdoc[type] = combineObj(dbdoc[type], json[type])

                // updatedb

                var coll = db.collection('stocks');
                coll.findOneAndUpdate({
                    _id: dbdoc._id
                }, {
                    $set: {
                            [type]: dbdoc[type]
                    }
                }, function (err, r) {
                    assert.equal(null, err);
                    //            test.equal(1, r.lastErrorObject.n);
                    //            test.equal(1, r.value.b);
                    //            test.equal(1, r.value.d);
                    coll.find({
                        symbol: dbdoc.symbol
                    }).toArray(function (err, docs) {
                        assert.equal(err, null);
                        console.log("Found: " + docs.length + " records");
                        //                            log(docs);
                        //                            db.close();
                        //                            callback(docs);
                    });
                });
                // end of updatedb                    
            }
        }
    }

}
