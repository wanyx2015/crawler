library(rvest)
library(lubridate)
library(RSelenium)

setwd("D:/01.Personal/01 Coursera/01 Data Science/JHU/sina")


# start server phantomjs, chrome, firefox
startServer() 
rd <- remoteDriver(remoteServerAddr = "localhost", port = 4444, browserName = "phantomjs") 
Sys.sleep(5)

# open connection; Firefox window should pop up
rd$open() 
rd$setImplicitWaitTimeout(30000)
rd$maxWindowSize()

url <- 'http://vip.stock.finance.sina.com.cn/q/view/vFutures_History.php?jys=cffex&pz=IF&hy=IF1608&breed=IF1608&type=cffex&start=2016-05-01&end=2016-08-12'

rd$navigate(url)


xpath <- '/html/body/div[1]/div[5]/div[2]/div[2]/table[1]'
e <- rd$findElement(using = 'xpath', value = xpath)
rd$mouseMoveToLocation(webElement = e)
#e$highlightElement()
#print(e$getElementText()[[1]])
#e$getElementText()[[1]]

html <- e$getElementAttribute("outerHTML")[[1]]
t <- readHTMLTable(html, header=FALSE, as.data.frame=TRUE)[[1]]
print(t)
