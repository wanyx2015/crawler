// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html

var log = console.log;

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

//driver.get('http://en.wikipedia.org/wiki/Wiki');
//driver.findElements(webdriver.By.css('[href^="/wiki/"]')).then(function (links) {
//    console.log('Found', links.length, 'Wiki links.')
//        //    driver.quit();
//});

var url, xpath;

///////////////////////////////PART 1//////////////////////////////////////////


// http://breathtakingdestinations.tumblr.com/


var url1 = 'http://breathtakingdestinations.tumblr.com/'

driver.get(url1).then(function () {
    console.log("Page loading finished: " + url1);
})

xpath = '//img'


var promise = require('selenium-webdriver').promise;

var pendingElements = driver.findElements(By.xpath(xpath))

pendingElements.then(function (elements) {
    var pendingHtml = elements.map(function (elem) {
        //        return elem.getInnerHtml();
        //        return elem.getText();
        //        return elem.getAttribute('alt');
        return elem.getAttribute('src');
    });

    promise.all(pendingHtml).then(function (allHtml) {
        // `allHtml` will be an `Array` of strings
        log("result: ")
        for (var key in allHtml) {
            log(key + ": " + allHtml[key]);
        }
    });
});



////////////////////////////// below is for scroll down test //////////////////////////

//pendingElements = driver.findElements(By.className("photo-cover"))
pendingElements = driver.findElements(By.className("nivo-lb"))

pendingElements.then(function (elements) {
    var pendingHtml = elements.map(function (elem) {
        return elem;
    });

    promise.all(pendingHtml).then(function (allElem) {
        // `allHtml` will be an `Array` of strings
        log("allElem size: " + allElem.length)

        return allElem[allElem.length - 1]
    }).then(function (element) {
        //滚动到底部，等待加载更多...
        driver.executeScript("arguments[0].scrollIntoView()", element);
        log("sleeping 11 seconds")
        driver.sleep(11000);


        driver.findElements(By.className("nivo-lb")).then(function (elements) {
            var pendingHtml = elements.map(function (elem) {
                return elem.getAttribute('href');
            });

            promise.all(pendingHtml).then(function (allElem) {
                // `allHtml` will be an `Array` of strings
                log("allElem size: " + allElem.length)

                return allElem[allElem.length]
            });
        });
    });
});

function scrollAndUpdate(num){
    log("doing " + num + " scroll...");
    var pendingElements = driver.findElements(By.className("nivo-lb"));
    
    pendingElements.then(function (elements) {
        var pendingHtml = elements.map(function (elem) {
        return elem;
    });

    promise.all(pendingHtml).then(function (allElem) {
        log("allElem size: " + allElem.length)
        return allElem[allElem.length - 1]
    }).then(function (element) {
        //滚动到底部，等待加载更多...
        driver.executeScript("arguments[0].scrollIntoView()", element);
        log("sleeping 11 seconds")
        driver.sleep(11000);

        if(num >= 1){
        scrollAndUpdate(num-1);
        }

//        driver.findElements(By.className("nivo-lb")).then(function (elements) {
//            var pendingHtml = elements.map(function (elem) {
//                return elem.getAttribute('href');
//            });
//
//            promise.all(pendingHtml).then(function (allElem) {
//                // `allHtml` will be an `Array` of strings
//                log("allElem size: " + allElem.length)
//
//                return allElem[allElem.length]
//            });
//        });
    });
});


}

scrollAndUpdate(4)

//////////////////////////////////////////////////////////////////////////////////////

//xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "normal", " " ))]'

var pendingElements = driver.findElements(By.className("nivo-lb"))

pendingElements.then(function (elements) {
    var pendingHtml = elements.map(function (elem) {
        //        return elem.getInnerHtml();
        //        return elem.getText();
        //        return elem.getAttribute('alt');
        return elem.getAttribute('href');
    });

    promise.all(pendingHtml).then(function (allHtml) {
        // `allHtml` will be an `Array` of strings
        log("result: ")
        for (var key in allHtml) {
            log(key + ": " + allHtml[key]);
        }
    });
});


//////////////////////////////////////PART 2///////////////////////////////////////////
url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=600251';


driver.get(url).then(function (e) {
    console.log(e);
    console.log("Page loading finished." + url)
})

xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
driver.findElement(By.xpath(xpath)).then(function (e) {
    //    console.log(e)
    return e.getText()
}).then(function (text) {
    console.log(text)
});

xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/th/a' //流动资产合计

driver.findElement(By.xpath(xpath))
    .then(function (e) {
        console.log("1 then " + e.getText())
        return e.getText()
    })
    .then(function (text) {
        console.log("2 then")
        console.log(text)
    });


xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/td[1]'; //流动资产合计 value


driver.findElement(By.xpath(xpath))
    .then(function (e) {
        console.log("2.1 then: ")
        return e.getText();
    })
    .then(function (text) {
        console.log("2.2 then")
        console.log(text)
    });



xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/th/a'; //资产总计

driver.findElement(By.xpath(xpath))
    .then(function (e) {
        console.log("3.1 then: ")
        return e.getText()
    })
    .then(function (text) {
        console.log("3.1 then: ")
        console.log(text)
    });
xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/td[1]'; //资产总计 value


driver.findElement(By.xpath(xpath))
    .then(function (e) {
        console.log("4.1 then: ")
        return e.getText();
    })
    .then(function (text) {
        console.log("4.2 then: ")
        console.log(text)
    });


//driver.quit();
