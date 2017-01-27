// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html


var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    //    .forBrowser('phantomjs')
    // .forBrowser('chrome')
    // .usingServer('http://localhost:4444/wd/hub')
    .build();

// var chrome = require('selenium-webdriver/chrome');

driver.manage().window().maximize();
driver.manage().deleteAllCookies();

driver.get('http://global.bing.com/').then(function () {
    console.log("Visiting global.bing.com");
    return driver.findElement(By.name('q'));
}).then(function (q) {
    console.log("Search for selenium webdriver");
    q.sendKeys('selenium webdriver');
}).then(function () {
    console.log("Finding search button");
    return driver.findElement(By.name('go'));
}).then(function (q) {
    console.log("Clicking search button");
    return q.click();
}).then(function(){
    driver.sleep(1000);
}).then(function(){
    return driver.getTitle();
}).then(function(t){
    
    console.log("Getting title");
    console.log(t);
    
});
        



var sinaurl = 'http://money.finance.sina.com.cn/corp/go.php/vFD_BalanceSheet/stockid/000895/ctrl/2013/displaytype/4.phtml';
var xpath = '//*[@id="toolbar"]/div[1]/h1/a';

sinaurl = 'http://finance.sina.com.cn/stock/';
xpath = '//*[@id="directad00"]/div[1]/h2/a[1]';

driver.get(sinaurl).then(function () {
    console.log("Visiting link: " + sinaurl);
    return driver.findElement(By.xpath(xpath));

}).then(function (t) {

    t.click();

})


//driver.sleep(1000);
//console.log("Getting title");
//driver.getTitle().then(function (t) {
//    console.log(t);
//});

// .then(function () {
//     console.log("Finding search button");
//     return driver.findElement(By.name('go'));
// }).then(function (q) {
//     console.log("Clicking search button");
//     q.click();
// }).then(function () {
//     console.log("Getting title");
//     return driver.getTitle();
// }).then(function (t) {
//     console.log(t);
// });
