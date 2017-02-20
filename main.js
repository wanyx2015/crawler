// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var qq = require('./qq_cb');
var fs = require("fs"); // 流

var dburl = 'mongodb://localhost:27017/stock';

var json = {};
var log = console.log;


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

var url, xpath;


var symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410', '000977', '002520', '300216', '002410', '600478', '000895', '002271', '002081', '603000', '002367']
symbols = ['600410'];

var years = [2016, 2015, 2014, 2013, 2012, 2011, 2010];
//years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]
years = [2016]

fs.readFile('./all_symbols_qq.txt', function (err, data) {
    log("Reading file...");
    if (err) throw err;


    //////////////////////
    symbols = data.toString().split('\r\n');
    symbols = ['000535', '600410'];

    //////////////////////


    log("Num of symbols: " + symbols.length);
    processSymbols();
});


function processSymbols() {


    for (idx in symbols) {

        for (i in years) {


            log("Processing " + symbols[idx] + ", " + years[i]);

            qq.assetSheet(symbols[idx], years[i], function (data) {
                log("------------------------------ in main's inst callback");
                //            log(data);

                var year = years[i];
                var symbol = symbols[idx];


                checkDB(data.symbol, function (docs) {
                    if (docs.length == 0) {
                        // NO RECORDS, STORE THE DATA FOR THE FIRST TIME
                        insertDB(data);
                    } else {
                        //UPDATE THE RECORD
                        assert(docs.length == 1)
                        updateDB(docs[0], 'asset', year, data)
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

    }
}

function checkDB(symbol, callback) {
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

function insertDB(json, callback) {
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

function updateDB(dbdoc, type, year, json) {

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
