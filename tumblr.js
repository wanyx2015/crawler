// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = webdriver.promise;


var log = console.log;
var fs = require("fs"); // 流
var http = require('http'); // http 网路

var driver = new webdriver.Builder()
    //    .forBrowser('firefox')
    .forBrowser('phantomjs')
    // .forBrowser('chrome')
    // .usingServer('http://localhost:4444/wd/hub')
    .build();

// var chrome = require('selenium-webdriver/chrome');

driver.manage().window().maximize();
driver.manage().deleteAllCookies();


var filename = "links_" + Math.floor((Math.random() * 1000000) + 1) + ".txt"
var url = 'http://breathtakingdestinations.tumblr.com/?page=';
var numOfPage = 2400;
var startNum = 1;

scrollAndUpdate(startNum);

function scrollAndUpdate(num) {

    driver.get(url + num).then(function () {
        log("Opening page " + url + num + " done, local file is " + filename);

        driver.findElements(By.className("nivo-lb")).then(function (elements) {
            log("Number of images: " + elements.length);

            //PREPARING DATA TO WRITE TO LOCAL FILE
            var pendingHtml = elements.map(function (elem) {
                return elem.getAttribute('href');
            });

            promise.all(pendingHtml).then(function (allHtml) {
                // `allHtml` will be an `Array` of strings
                var link_txt = "";

                console.time("Process all HTML");
                for (var i in allHtml) {
                    link_txt += allHtml[i] + "\r\n";
                }
                console.timeEnd("Process all HTML");

                //WRITE TO LOCAL FILE
                console.time("save");
                fs.appendFile(filename, link_txt, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.timeEnd("save");

                    if (num < numOfPage) {
                        scrollAndUpdate(++num);
                    } else {
                        log("Job finished.")
                        driver.quit();
                    }

                });
            });
        });

    });
}
