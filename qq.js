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


var symbol = '002271';
var years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]
years = [2016, 2015, 2014, 2013, 2012, 2011, 2010]

for (year in years) {
    log(years[year]);
    assetSheet(symbol, years[year]);
    incomeSheet(symbol, years[year]);
    cashflowSheet(symbol, years[year]);
}



function assetSheet(symbol, year) {
    ////////////////////////////////////// 资产负债表//////////////////////////////////////////



    var asset = {};

    var url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=002271&type=2015';

    url = 'http://stock.finance.qq.com/corp1/cbsheet.php?zqdm=' + symbol + '&type=' + year;

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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);


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


        if (json.name != null && json.name.length > 0) {

            json.asset = combineObj(json.asset, {

                [result]: asset

            })
        } else {
            json = combineObj(json, {
                asset: {
                [result]: asset
                }
            })

        }



        log(json);
        return result;
    });

    //    driver.quit()

    //    log(asset);

}



function incomeSheet(symbol, year) {
    ////////////////////////////////////// 利润表 //////////////////////////////////////////

    var asset = {};

    var url = 'http://stock.finance.qq.com/corp1/inst.php?zqdm=002271&type=2015';

    url = 'http://stock.finance.qq.com/corp1/inst.php?zqdm=' + symbol + '&type=' + year;



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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);

        //        json = combineObj(json, {
        //            income: asset
        //        })
        return result;
    });

    xpath = '/html/body/div[2]/div/table[3]/tbody/tr[1]/td[1]' //报告日期
    getanddisplay(xpath);
    driver.findElement(By.xpath(xpath)).then(function (e) {
        return e.getText();
    }).then(function (text) {
        result = text.replace('万元', '');
        log(result);


        if (json.name != null && json.name.length > 0) {
            log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Writing income for second time...")
            log(asset);
            log(json)
            json.income = combineObj(json.income, {
                [result]: asset
            })
        } else {

            log("#####################################################Writing income for first time...")
            log(asset);
            log(json);
            json = combineObj(json, {
                income: {
                [result]: asset
                }
            })

            log("********************* after combinging, json: ")
            log(json)

        }




        //        log(asset);
        return result;
    });


    //    driver.quit();

}

function cashflowSheet(symbol, year) {
    ////////////////////////////////////// 现金流量表 //////////////////////////////////////////

    var name = '';
    var asset = {};
    var url = 'http://stock.finance.qq.com/corp1/cfst.php?zqdm=002271&type=2015';
    url = 'http://stock.finance.qq.com/corp1/cfst.php?zqdm=' + symbol + '&type=' + year;


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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);
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

        //        log(asset);

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



        if (json.name != null && json.name.length > 0) {

            json.cashflow = combineObj(json.cashflow, {

                [result]: asset

            })
        } else {
            json = combineObj(json, {
                name: name,
                cashflow: {
                [result]: asset
                }
            })

        }
        log(JSON.stringify(json));





        log(json);
        return result;
    });



    //    driver.quit();

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


a = {
    asset: {
        '2016-09-30': {
            ar: '298,468.00',
            gdzc: '137,414.00',
            zzc: '870,648.00',
            zfz: '409,135.00',
            syzqy: '461,513.00',
            ldzc: '618,748.00'
        },
        '2015-12-31': {
            ar: '208,208.00',
            gdzc: '131,365.00',
            zzc: '608,406.00',
            zfz: '201,563.00',
            syzqy: '406,843.00',
            ldzc: '394,391.00'
        },
        '2014-12-31': {
            ar: '154,241.00',
            gdzc: '90,269.00',
            zzc: '514,122.00',
            zfz: '167,905.00',
            syzqy: '346,217.00',
            ldzc: '357,122.00'
        },
        '2013-12-31': {
            ar: '121,898.00',
            gdzc: '71,068.50',
            zzc: '352,005.00',
            zfz: '181,941.00',
            syzqy: '170,064.00',
            ldzc: '242,948.00'
        },
        '2012-12-31': {
            ar: '89,701.00',
            gdzc: '45,016.20',
            zzc: '281,136.00',
            zfz: '155,401.00',
            syzqy: '125,735.00',
            ldzc: '201,358.00'
        },
        '2011-12-31': {
            ar: '72,217.40',
            gdzc: '31,471.00',
            zzc: '232,636.00',
            zfz: '122,796.00',
            syzqy: '109,840.00',
            ldzc: '185,846.00'
        },
        '2010-12-31': {
            ar: '53,730.90',
            gdzc: '20,704.40',
            zzc: '219,761.00',
            zfz: '116,503.00',
            syzqy: '103,258.00',
            ldzc: '192,201.00'
        }
    },
    income: {
        '2016-09-30': {
            revenue: '479,812.00',
            opcost: '266,162.00',
            taxaddon: '4,902.01',
            salescost: '61,858.60',
            mgmcost: '51,266.40',
            fincost: '4,439.76',
            assetloss: '9,441.34',
            opprofit: '81,321.20',
            yywsr: '3,455.80',
            yywzc: '457.25',
            mgsjlr: '72,069.60'
        },
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
        },
        '2014-12-31': {
            revenue: '500,592.00',
            opcost: '322,192.00',
            taxaddon: '7,269.02',
            salescost: '47,740.00',
            mgmcost: '51,266.90',
            fincost: '5,684.19',
            assetloss: '4,456.03',
            opprofit: '62,385.40',
            yywsr: '2,857.05',
            yywzc: '95.90',
            mgsjlr: '57,655.10'
        },
        '2013-12-31': {
            revenue: '390,263.00',
            opcost: '258,362.00',
            taxaddon: '5,547.59',
            salescost: '39,934.70',
            mgmcost: '35,517.70',
            fincost: '6,410.46',
            assetloss: '3,277.76',
            opprofit: '41,512.30',
            yywsr: '3,078.29',
            yywzc: '208.93',
            mgsjlr: '36,370.70'
        },
        '2012-12-31': {
            revenue: '297,857.00',
            opcost: '210,166.00',
            taxaddon: '3,630.16',
            salescost: '30,799.60',
            mgmcost: '24,355.90',
            fincost: '6,674.82',
            assetloss: '3,055.45',
            opprofit: '19,174.70',
            yywsr: '3,368.54',
            yywzc: '279.61',
            mgsjlr: '18,866.30'
        },
        '2011-12-31': {
            revenue: '247,365.00',
            opcost: '179,146.00',
            taxaddon: '2,838.43',
            salescost: '26,498.20',
            mgmcost: '22,966.50',
            fincost: '5,551.72',
            assetloss: '1,953.90',
            opprofit: '8,410.44',
            yywsr: '3,386.63',
            yywzc: '86.72',
            mgsjlr: '10,453.00'
        },
        '2010-12-31': {
            revenue: '198,166.00',
            opcost: '141,125.00',
            taxaddon: '1,499.31',
            salescost: '20,560.00',
            mgmcost: '18,686.80',
            fincost: '3,022.67',
            assetloss: '1,720.76',
            opprofit: '11,551.10',
            yywsr: '663.18',
            yywzc: '129.54',
            mgsjlr: '10,384.00'
        }
    },
    name: '东方雨虹 002271',
    cashflow: {
        '2016-09-30': {
            opcf: '-2,615.84',
            incf: '-43,495.00',
            fucf: '101,946.00'
        },
        '2015-12-31': {
            opcf: '42,131.70',
            incf: '-59,490.40',
            fucf: '-13,820.60'
        },
        '2014-12-31': {
            opcf: '35,106.20',
            incf: '-49,542.00',
            fucf: '66,726.60'
        },
        '2013-12-31': {
            opcf: '26,359.40',
            incf: '-34,289.00',
            fucf: '4,472.89'
        },
        '2012-12-31': {
            opcf: '38,382.60',
            incf: '-28,882.70',
            fucf: '-6,747.69'
        },
        '2011-12-31': {
            opcf: '-18,790.90',
            incf: '-18,339.20',
            fucf: '-5,586.53'
        },
        '2010-12-31': {
            opcf: '-18,720.10',
            incf: '-13,550.40',
            fucf: '91,838.30'
        }
    }
}
