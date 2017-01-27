// var webdriver = require('selenium-webdriver');
// var driver = new webdriver.Builder().forBrowser('chrome').build();
// driver.get('bing.com');

var express = require('express'),
    http = require('http');

var hostname = 'localhost';
var port = 3000;

var app = express();

var cheerio = require('cheerio');
var request = require('request');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    // .usingServer('http://localhost:4444/wd/hub')
    .build();

driver.get('http://www.bing.com/');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();

 var url = 'http://stockhtm.finance.qq.com/sstock/quotpage/q/600251.htm#12';

 request(url, function (err, res, body) {
     console.log("Accessing: " + url);
     var $ = cheerio.load(body)
     var symbol = $('//*[@id="sp-0-17"]');
     console.log(symbol.text());

 })


var server = http.createServer(app);

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});