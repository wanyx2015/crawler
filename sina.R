#data <- read.csv("activity.csv")

library(rvest)
library(lubridate)
library(RSelenium)
library(mongolite)
library(jsonlite)

setwd("D:/01.Personal/01 Coursera/01 Data Science/JHU/sina")


# start server phantomjs, chrome, firefox
startServer() 
rd <- remoteDriver(remoteServerAddr = "localhost", port = 4444, browserName = "phantomjs") 
Sys.sleep(5)

# open connection; Firefox window should pop up
rd$open() 
rd$setImplicitWaitTimeout(30000)
rd$maxWindowSize()



getValue <- function(remoteDrv, xPath){
    e <- remoteDrv$findElement(using = 'xpath', value = xPath)
#     remoteDrv$mouseMoveToLocation(webElement = e)
#     e$highlightElement()
#     print(e$getElementText()[[1]])
    e$getElementText()[[1]]
    
}

# symbolList <- c('600410', '000977', '002520', '300216', '002410', '600478', 
#             '002081', '603000', '002367')
symbolList <- c('000895')

symbolName <- ''


for (symbol in symbolList){
    
    print(symbol)
    data <- data.frame()
    
    for (year in 2016:2011)
    {
        ########################################### 利润表
        url <- 'http://money.finance.sina.com.cn/corp/go.php/vFD_ProfitStatement/stockid/'
        type <- '/displaytype/4.phtml'
        url <- paste(url, symbol, '/ctrl/' ,year, type, sep='')
        print(url)
        
        rd$navigate(url)
        
        # 营业收入
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[3]/td[2]'
        yysr <- getValue(rd, xpath)
        
        ## 营业总成本
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[10]/td[2]'
        yyzcb <- getValue(rd, xpath)
        
        ## 营业成本
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[11]/td[2]'
        yycb <- getValue(rd, xpath)
        
        
        ## 销售费用
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[23]/td[2]'
        xsfy <- getValue(rd, xpath)
        
        ## 管理费用
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[24]/td[2]'
        glfy <- getValue(rd, xpath)
        
        ## 财务费用
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[25]/td[2]'
        cwfy <- getValue(rd, xpath)
        
        
        # 营业利润数据
        
        ## 营业利润
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[35]/td[2]'
        yylr <- getValue(rd, xpath)
        
        ## 营业外收入
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[36]/td[2]'
        yywsr <- getValue(rd, xpath)
        
        ## 营业外支出
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[37]/td[2]'
        yywzc <- getValue(rd, xpath)
        
        ## 母公司净利润
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[43]/td[2]'
        jlrmgs <- getValue(rd, xpath)
        
        income <- c(yysr, yyzcb, yycb, xsfy, glfy, cwfy, yylr, yywsr, yywzc, jlrmgs)
        
        ############################# 现金流量表
        url <- "http://money.finance.sina.com.cn/corp/go.php/vFD_CashFlow/stockid/"
        type <- '/displaytype/4.phtml'
        url <- paste(url, symbol, '/ctrl/' ,year, type, sep='')
        print(url)
        rd$navigate(url)
        
        ## 经营现金流
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[28]/td[2]'
        jyxjl <- getValue(rd, xpath)
        
        
        ## 投资现金流
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[44]/td[2]'
        tzxjl <- getValue(rd, xpath)
        
        
        ## 筹资现金流
        xpath <- '//*[@id="ProfitStatementNewTable0"]/tbody/tr[57]/td[2]'
        czxjl <- getValue(rd, xpath)
        
        cashflow <- c(jyxjl, tzxjl, czxjl)
        
        ######################## 资产负债表
        url <- "http://money.finance.sina.com.cn/corp/go.php/vFD_BalanceSheet/stockid/"
        type <- '/displaytype/4.phtml'
        url <- paste(url, symbol, '/ctrl/' ,year, type, sep='')
        print(url)
        rd$navigate(url)
        
        ## 应收账款
        xpath <- '//*[@id="BalanceSheetNewTable0"]/tbody/tr[10]/td[2]'
        yszk <- getValue(rd, xpath)
        
        ## 固定资产
        xpath <- '//*[@id="BalanceSheetNewTable0"]/tbody/tr[55]/td[2]'
        gdzc <- getValue(rd, xpath)
        
        ## 总资产
        xpath <- '//*[@id="BalanceSheetNewTable0"]/tbody/tr[56]/td[2]'
        zzc <- getValue(rd, xpath)
        
        ## 总负债
        xpath <- '//*[@id="BalanceSheetNewTable0"]/tbody/tr[99]/td[2]'
        zfz <- getValue(rd, xpath)
        
        ## 所有者权益
        xpath <- '//*[@id="BalanceSheetNewTable0"]/tbody/tr[113]/td[2]'
        syzqy <- getValue(rd, xpath)
        
        asset <- c(yszk, gdzc, zzc, zfz, syzqy)
        
        if(ncol(data) == 0){
            data <- data.frame(c(income, cashflow, asset))
        }else{
            data <- cbind(data, c(income, cashflow, asset))    
        }
        
        xpath <- '//*[@id="toolbar"]/div[1]/h1/a'
        e <- rd$findElement(using = 'xpath', value = xpath)
        symbolName <- e$getElementText()[[1]]
        print(symbolName)
    }
    
    colnames(data) <- c(2016:2011)
    rownames(data) <- c('营业收入','营业总成本','营业成本','销售费用','管理费用',
                        '财务费用','营业利润','营业外收入','营业外支出','母公司净利润',
                        '经营现金流','投资现金流','筹资现金流',
                        '应收账款','固定资产','总资产','总负债','所有者权益')
    print(data)
    
    str(data)
    
    
#     m <- mongo(collection = "stock", db = "sina")
# m$insert(data)
# m$find()$pretty()

    write.csv(data, file = paste(paste(symbol, symbolName), ".csv", sep = ''))
}


