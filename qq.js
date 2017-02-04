// https://www.npmjs.com/package/selenium-webdriver

// http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html

var json = {};
var log = console.log;

var getanddisplay = function (xpath) {
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        //        log(result);
        return result;
    });
}


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



    var asset = {};

    url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015';


    driver.get(url).then(function (e) {
        log("Page loading finished: " + url)
            //        driver.sleep(2000);
            //        log(asset);
    })

    xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
    });




    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/th/a' //应收账款
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/td[1]' //应收账款 value
        //        getanddisplay(xpath, asset, 'ar');

    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'ar': result
        })

        log(asset);
        return result;
    });


    //    asset = combineObj(asset, {
    //        'ar': getanddisplay(xpath)
    //    })

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[21]/th/a' //固定资产
    getanddisplay(xpath);


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[21]/td[1]' //固定资产 value
        //    getanddisplay(xpath, asset, 'gdzc');
        //    asset = combineObj(asset, {
        //        'gdzc': getanddisplay(xpath)
        //    })
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'gdzc': result
        })

        log(asset);
        return result;
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/th/a' //总资产
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/td[1]' //总资产 value

    //        getanddisplay(xpath, asset, 'zzc');

    //    getanddisplay(xpath);
    //    asset = combineObj(asset, {
    //        'zzc': getanddisplay(xpath)
    //    })

    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'zzc': result
        })

        log(asset);
        return result;
    });



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[57]/th/a' //总负债
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[57]/td[1]' //总负债 value
        //    getanddisplay(xpath);
        //    asset = combineObj(asset, {
        //        'zfz': getanddisplay(xpath)
        //    })
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'zfz': result
        })

        log(asset);
        return result;
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[66]/th/a' //所有者权益
    getanddisplay(xpath);

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[66]/td[1]' //所有者权益 value
        //    getanddisplay(xpath);
        //    asset = combineObj(asset, {
        //        'syzqy': getanddisplay(xpath)
        //    })

    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'syzqy': result
        })

        log(asset);
        return result;
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/th/a' //流动资产合计
    getanddisplay(xpath);



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/td[1]'; //流动资产合计 value
    //    getanddisplay(xpath);
    //    asset = combineObj(asset, {
    //        'ldzc': getanddisplay(xpath)
    //    })
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'ldzc': result
        })

        log(asset);


        return result;
    });



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/th/a'; //资产总计
    //    getanddisplay(xpath);



    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[34]/td[1]'; //资产总计 value
    //    getanddisplay(xpath);


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[1]/td[1]' //报告日期
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        json = combineObj(json, {
            asset: {
                [result]: asset
            }
        })

        //        asset = combineObj(asset, {
        //            'year': result
        //        })

        log(asset);
        return result;
    });

    //    driver.quit()

    //    log(asset);

}



function incomeSheet() {
    ////////////////////////////////////// 利润表 //////////////////////////////////////////

    var asset = {};

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
    getanddisplay(xpath);


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[2]/td[1]' //营业收入 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'revenue': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[3]/th/a' //营业成本
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[3]/td[1]' //营业成本 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'opcost': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[4]/th/a' //营业税金及附加
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[4]/td[1]' //营业税金及附加 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'taxaddon': result
        })

        log(asset);
        return result;
    });
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[5]/th/a' //销售费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[5]/td[1]' //销售费用 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'salescost': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/th/a' //管理费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[6]/td[1]' //管理费用 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'mgmcost': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[7]/th/a' //财务费用
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[7]/td[1]' //财务费用 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'fincost': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[8]/th/a' //资产减值损失
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[8]/td[1]' //资产减值损失 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'assetloss': result
        })

        log(asset);
        return result;
    });

    //营业利润

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/th/strong/a' //营业利润
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/td[1]' //营业利润 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'opprofit': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[13]/th/a' //营业外收入
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[13]/td[1]' //营业外收入 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'yywsr': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/th/a' //营业外支出
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[14]/td[1]' //营业外支出 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'yywzc': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[19]/th/a' //母公司净利润
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[19]/td[1]' //母公司净利润 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'mgsjlr': result
        })

        log(asset);

        json = combineObj(json, {
            income: asset
        })
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[1]/td[1]' //报告日期
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        json = combineObj(json, {
            income: {
                [result]: asset
            }
        })

        log(asset);
        return result;
    });


    //    driver.quit();

}

function cashflowSheet() {
    ////////////////////////////////////// 现金流量表 //////////////////////////////////////////

    var name = '';
    var asset = {};
    url = 'http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015';


    driver.get(url).then(function (e) {
        log("Page loading finished: " + url)
    })

    xpath = '/html/body/div[2]/div/div[1]/span[1]/a';
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText()
    }).then(function (text) {
        log(text)
        name = text;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[1]/td[1]' //报告日期
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        //        asset = combineObj(asset, {
        //            'year': result
        //        })

        log(asset);
        return result;
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/th/a' //经营现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[12]/td[1]' //经营现金流 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'opcf': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[25]/th/a' //投资现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[25]/td[1]' //投资现金流 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'incf': result
        })

        log(asset);
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[35]/th/a' //筹资现金流
    getanddisplay(xpath);
    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[35]/td[1]' //筹资现金流 value
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        asset = combineObj(asset, {
            'fucf': result
        })

        log(asset);

        //        json = combineObj(json, {
        //                cashflow: asset
        //            })
        //        log(JSON.stringify(json));
        log(json);
        return result;
    });


    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[1]/td[1]' //报告日期
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);

        json = combineObj(json, {
            name: name,
            cashflow: {
                [result]: asset
            }
        })


        log(json);
        return result;
    });



    driver.quit();

}



var j = {
    "asset": {
        "year": "2015-12-31",
        "ar": "208,208.00",
        "gdzc": "131,365.00",
        "zzc": "608,406.00",
        "zfz": "201,563.00",
        "syzqy": "406,843.00",
        "ldzc": "394,391.00"
    },
    "income": {
        "year": "2015-12-31",
        "revenue": "530,399.00",
        "opcost": "314,197.00",
        "taxaddon": "9,079.55",
        "salescost": "65,301.70",
        "mgmcost": "59,513.30",
        "fincost": "2,706.60",
        "assetloss": "6,854.29",
        "opprofit": "72,807.40",
        "yywsr": "11,656.70",
        "yywzc": "740.62",
        "mgsjlr": "72,971.50"
    },
    "cashflow": {
        "year": "2015-12-31",
        "opcf": "42,131.70",
        "incf": "-59,490.40",
        "fucf": "-13,820.60"
    }
}

var b = {
    asset: {
        '2015-12-31': {
            ar: '208,208.00',
            gdzc: '131,365.00',
            zzc: '608,406.00',
            zfz: '201,563.00',
            syzqy: '406,843.00',
            ldzc: '394,391.00'
        }
    },
    income: {
        '2015-12-31': {
            revenue: '530,399.00',
            opcost: '314,197.00',
            taxaddon: '9,079.55',
            salescost: '65,301.70',
            mgmcost: '59,513.30',
            fincost: '2,706.60',
            assetloss: '6,854.29',
            opprofit: '72,807.40',
            yywsr: '11,656.70',
            yywzc: '740.62',
            mgsjlr: '72,971.50'
        }
    },
    name: '东方雨虹 002271',
    cashflow: {
        '2015-12-31': {
            opcf: '42,131.70',
            incf: '-59,490.40',
            fucf: '-13,820.60'
        }
    }
}
