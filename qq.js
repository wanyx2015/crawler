// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html

var log = console.log;

var getanddisplay = function (xpath) {
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        log(text);
        return text;
    });
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

assetSheet();
incomeSheet();
cashflowSheet();


function assetSheet() {
    ////////////////////////////////////// 资产负债表//////////////////////////////////////////


    url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015';


    driver.get(url).then(function (e) {
        log("Page loading finished: " + url)
    })

    xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    log('')

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/th/a' //应收账款
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/td[1]' //应收账款 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[21]/th/a' //固定资产
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[21]/td[1]' //固定资产 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/th/a' //总资产
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/td[1]' //总资产 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[57]/th/a' //总负债
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[57]/td[1]' //总负债 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[66]/th/a' //所有者权益
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[66]/td[1]' //所有者权益 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/th/a' //流动资产合计
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/td[1]'; //流动资产合计 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/th/a'; //资产总计
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/td[1]'; //资产总计 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    //    driver.quit()

}



function incomeSheet() {
    ////////////////////////////////////// 利润表 //////////////////////////////////////////


    url = 'http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2015';


    driver.get(url).then(function (e) {
        log("Page loading finished: " + url)
    })

    xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[2]/th/strong/a' //营业收入
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[2]/td[1]' //营业收入 value
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[3]/th/a' //营业成本
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[3]/td[1]' //营业成本 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[4]/th/a' //营业税金及附加
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[4]/td[1]' //营业税金及附加 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[5]/th/a' //销售费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[5]/td[1]' //销售费用 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/th/a' //管理费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/td[1]' //管理费用 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[7]/th/a' //财务费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[7]/td[1]' //财务费用 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[8]/th/a' //资产减值损失
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[8]/td[1]' //资产减值损失 value
    getanddisplay(xpath);


    //营业利润

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/th/strong/a' //营业利润
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/td[1]' //营业利润 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[13]/th/a' //营业外收入
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[13]/td[1]' //营业外收入 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/th/a' //营业外支出
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/td[1]' //营业外支出 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[19]/th/a' //母公司净利润
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[19]/td[1]' //母公司净利润 value
    getanddisplay(xpath);

    //    driver.quit();

}

function cashflowSheet() {
    ////////////////////////////////////// 利润表 //////////////////////////////////////////


    url = 'http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015';


    driver.get(url).then(function (e) {
        log("Page loading finished: " + url)
    })

    xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/th/a' //经营现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/td[1]' //经营现金流 value
    getanddisplay(xpath);


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[25]/th/a' //投资现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[25]/td[1]' //投资现金流 value
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[35]/th/a' //筹资现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[35]/td[1]' //筹资现金流 value
    getanddisplay(xpath);



    driver.quit();

}
