// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html

var log = console.log;
var fs = require("fs"); // 流
var http = require('http'); // http 网路


var filename = "links_" + Math.floor((Math.random() * 1000000) + 1) + ".txt"

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    // .forBrowser('phantomjs')
    // .forBrowser('chrome')
    // .usingServer('http://localhost:4444/wd/hub')
    .build();

// var chrome = require('selenium-webdriver/chrome');

driver.manage().window().maximize();
driver.manage().deleteAllCookies();

//driver.get('http://en.wikipedia.org/wiki/Wiki');
//driver.findElements(webdriver.By.css('[href^="/wiki/"]')).then(function (links) {
//    console.log('Found', links.length, 'Wiki links.')
//        //    driver.quit();
//});

var url, xpath, result;
var promise = require('selenium-webdriver').promise;

///////////////////////////////PART 1//////////////////////////////////////////


// http://breathtakingdestinations.tumblr.com/


var url1 = 'http://breathtakingdestinations.tumblr.com/'

driver.get(url1).then(function () {
    console.log("Page loading finished: " + url1);
    scrollAndUpdate(1000);
})


//driver.get('http://68.media.tumblr.com/cce034bec4d1d430d998e82adad56297/tumblr_ojl3gcQy041snegd3o1_1280.jpg').then(function (res) {
//    log(res);
//    console.log("Page loading finished: " + url1);
//})
////////////////////////////// below is for scroll down test //////////////////////////


function scrollAndUpdate(num) {
    log("doing " + num + " scroll...");

    driver.findElement(By.className("copyright")).then(function (e) {
        driver.executeScript("arguments[0].scrollIntoView()", e);

        log("sleeping 10 seconds")
        driver.sleep(5000);

        if (num > 1) {

            driver.findElements(By.className("nivo-lb")).then(function (elements) {
                log(elements.length);

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
                    fs.writeFile(filename, link_txt, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        console.timeEnd("save");

                    });
                });
            });

            scrollAndUpdate(num - 1);

        } else {

            driver.findElements(By.className("nivo-lb")).then(function (elements) {
                var pendingHtml = elements.map(function (elem) {
                    //        return elem.getInnerHtml();
                    //        return elem.getText();
                    //        return elem.getAttribute('alt');
                    return elem.getAttribute('href');
                });

                promise.all(pendingHtml).then(function (allHtml) {
                    // `allHtml` will be an `Array` of strings
                    result = allHtml;
                    log("result: ");
                    log(result);

                    for (var key in allHtml) {
                        //                        log(allHtml[key]);
                        //                            downImg(allHtml[key]);
                    }
                    log(allHtml.length);
                });
            });
        }
    })
}



function downImg(imgurl) {
    var narr = imgurl.split("/")
        // 做一步优化，如果存在文件，则不下载

    log(narr[narr.length - 1]);

    var filename = './tumblr/' + narr[narr.length - 1];
    fs.exists(filename, function (b) {
        if (!b) {
            // 文件不存则进行 下载
            http.get(imgurl, function (res) {
                var imgData = "";
                //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.setEncoding("binary");

                res.on("data", function (chunk) {
                    imgData += chunk;
                });

                res.on("end", function () {
                    //                    var savePath = "./upload/topic1/" + narr[0] + narr[1] + narr[2] + "_" + narr[4];
                    fs.writeFile(filename, imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(filename);
                            if (urls.length > 0) {
                                downImg(urls.shift());
                                downCount++;
                                console.log("剩余图片数量....");
                            }
                        }
                    });
                });
            });
        } else {
            // 统计重复的图片
            console.log("该图片已经存在重复.");
            //            reptCount++;
            //            if (urls.length > 0) {
            //                downImg(urls.shift());
            //            }
        }
    });

    //    if (urls.length <= 0) {
    //        console.log("下载完毕");
    //        console.log("重复图片：" + reptCount);
    //        console.log("实际下载：" + downCount);
    //    }
}


//driver.quit();
