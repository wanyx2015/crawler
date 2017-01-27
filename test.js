let cheerio = require('cheerio')
let $ = cheerio.load('<h2 class="title">Hello world</h2>')

console.log($.html())

$('h2.title').text('Hello there!')
console.log($.html())

$('h2').addClass('welcome')
console.log($.html())

console.log($('h2').get().length)

//<ul id="fruits">
//  <li class="apple">Apple</li>
//  <li class="orange">Orange</li>
//  <li class="pear">Pear</li>
//</ul>

$ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>')
console.log($.html())

$('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>')
console.log($.html())

$('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>', {
    normalizeWhitespace: true,
    xmlMode: true
});
console.log($.html())
console.log($('ul li').get().length)



// selector: $( selector, [context], [root] )
// 根在后，具体元素在前

var e

e = $('.apple', '#fruits').text();
console.log(e)

e = $('ul .pear').attr('class')
console.log(e)


e = $('ul .pear').text()
console.log(e)

e = $('li[class=orange]').html()
console.log(e)


e = $('ul').attr('id')
console.log(e)

e = $('.apple').attr('id', 'favorite').html()
console.log(e)

e = $.html()
console.log(e)


var http = require('http'); // http 网路
var fs = require("fs"); // 流

var href = "http://stockhtm.finance.qq.com/sstock/quotpage/q/600251.htm"; // 设置被查询的目标网址
var pageData;

    var req = http.get(href, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            pageData += chunk;
//            console.log("data: " + chunk);
        });

        res.on('end', function () {
            $ = cheerio.load(pageData);
//            var html = $("tbody  tr:nth-child(34)  td:nth-child(2)");
            var html = $("table").get(1).length;
            
            
            console.log( $('span').attr('id') )
//            console.log(html);
            
            
            html = $("table").html();
            
            console.log(html);

//            for (var i = 0; i < html.length; i++) {
//                var src = html[i].attribs.src;
//                // 筛选部分广告，不是真的段子
//                if (src.indexOf("http://image.haha.mx") > -1) {
//                    urls.push(html[i].attribs.src)
//                }
//            }
            // 递归调用
//            if (serach < pagemax) {
//                getHtml(href, ++serach);
//            } else {
//                console.log("图片链接获取完毕！");
//                sumConut = urls.length;
//                console.log("链接总数量：" + urls.length);
//                console.log("开始下载......");
//                downImg(urls.shift());
//            }
        });
    });