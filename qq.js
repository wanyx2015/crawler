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

//////////////////////////////////////PART 2///////////////////////////////////////////
url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=600251';


driver.get(url).then(function (e) {
    console.log("Page loading finished: " + url)
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


driver.quit();
