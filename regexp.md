正则表达式
正则表达式(Regular Expression)是计算机科学的一个概念。正则表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。

创建
JavaScript通过内置对象RegExp支持正则表达式，有两种方式创建正则表达式对象，如果我们想匹配字符串中<%xxx%>两个百分号分割的字符串可以这么写

构造函数

 var reg=new RegExp('<%[^%>]+%>','g');
字面量

 var reg=/<%[^%>]%>/g;
最后的g代表全局，还有几个修饰符

g：global，全文搜索，不添加的话搜索到第一个结果停止搜索
i：ingore case，忽略大小写，默认大小写敏感
m：multiple lines，多行搜索
元字符
正则表达式让人望而却步以一个重要原因就是转义字符太多了，组合非常多，但是正则表达式的元字符（在正则表达式中具有特殊意义的专用字符，可以用来规定其前导字符）并不多

( [ { \ ^ $ | ) ? * + .
并不是每个元字符都有特定的意义，在不同的组合中元字符有不同的意义，分类看一下

字符	含义
\t	水平制表符
\r	回车符
\n	换行符
\f	换页符
\v	垂直制表符
\0	空字符
字符类
一般情况下正则表达式一个字符（转义字符算一个）对应字符串一个字符，表达式 jirengu 的含义是



但是我们可以使用元字符[]来构建一个简单的类, 比如[abcd]代表一个字符，这个字符可以是 abcd四个字符中的任意一个

取反
元字符[]组合可以创建一个类，我们还可以使用元字符^创建反向类/负向类，反向类的意思是不属于XXX类的内容，表达式 [^abc] 表示一个不是字符a或b或c的字符



范围类
按照上面的说明如果希望匹配单个数字那么表达式是这样的

  //匹配一个字符，这个字符可以是0-9中的任意一个
    var reg1 = /[0123456789]/

    //匹配一个字符，这个字符可以是0-9中的任意一个
    var reg2 = /[0-9]/

    //匹配一个字符，这个字符可以是a-z中的任意一个
    var reg3 = /[a-z]/

    //匹配一个字符，这个字符可以是大写字母、小写字母、数字中的任意一个
    var reg3 = /[a-zA-Z0-9]/
预定义类
字符	等价类	含义
.	[^\r\n]	除了回车符和换行符之外的所有字符
\d	[0-9]	数字字符
\D	[^0-9]	非数字字符
\s	[\t\n\x0B\f\r]	空白符
\S	[^\t\n\x0B\f\r]	非空白符
\w	[a-zA-Z_0-9]	单词字符，字母、数字下划线
\W	[^a-zA-Z_0-9]	非单词字符
有了这些预定义类，写一些正则就很方便了，比如我们希望匹配一个可以是 ab+数字+任意字符 的字符串，就可以这样写了 /ab\d./



边界
正则表达式还提供了几个常用的边界匹配字符

字符	含义
^	以xxx开头
$	以xxx结尾
\b	单词边界
\B	非单词边界
var str = 'hello1 world hello2 123456 \t \r jirengu \n ruoyu hello3'
str.match(/hello\d/g)   // ["hello1", "hello2", "hello3"]
str.match(/^hello\d/g)  // ["hello1"]
str.match(/hello\d$/g)   // ["hello3"]

var str2 = 'hello1 whello9orld hello2 12-hello8-3456 \t \r jirengu \n ruoyu hello3'
str2.match(/\bhello\d\b/g)   //["hello1", "hello2", "hello8", "hello3"] 
//注意-也用于区分单词边界
测试题：

变量 className 为页面DOM元素对应的class 属性字符串，以下代码是检测 className 中是否包含值为"header"的 class，写法是否正确，如不正确给出反例，并写出正确代码

var className = xxx
if(className.match(/\bheader\b/)){
    console.log('has class: header')
}
答案： 以上写法不正确，比如 className = 'header3 clearfix active header-fixed'，此时页面元素并没有 header 这个 class，但上面的代码会认为有。是因为-也是单词边界

正确的写法是:

var reg = /(^|\s)header($|\s)/g
量词
之前我们介绍的方法都是一一匹配的，如果我们希望匹配一个连续出现20次数字的字符串难道我们需要写成这样

\d\d\d\d...
为此正则表达式引入了一些量词

字符	含义
?	出现零次或一次（最多出现一次）
+	出现一次或多次（至少出现一次）
*	出现零次或多次（任意次）
{n}	出现n次
{n,m}	出现n到m次
{n,}	至少出现n次
var str1 = 'http://jirengu.com'
str1.match(/https?:\/\/.+/)  //匹配
str1.match(/https+:\/\/.+/)  //不匹配
str1.match(/https*:\/\/.+/)  //匹配

var str2 = 'https://jirengu.com'
str2.match(/https?:\/\/.+/)  //匹配
str2.match(/https+:\/\/.+/g) //匹配
str2.match(/https*:\/\/.+/g) //匹配

var str3 = 'httpssssss://jirengu.com'
str3.match(/https?:\/\/.+/g)  //不匹配
str3.match(/https+:\/\/.+/g)  //匹配
str3.match(/https*:\/\/.+/g)  //匹配
测试题：

如何匹配一个合法的 url？提示：url 以 http 或者 https 或者 // 开头

var reg = /^(https?:)?\/\/.+/


测试题：

如何匹配一个手机号？提示手机号以1开头，长度为11位数字

var reg = /1[3578]\d{9}/ // 错误
var reg2 = /^1[3578]\d{9}$/ //正确


贪婪模式与非贪婪模式
看了上面介绍的量词，也许爱思考的同学会想到关于匹配原则的一些问题，比如{3,5}这个量词，要是在句子中出现了十次，那么他是每次匹配三个还是五个，反正3、4、5都满足3～5的条件

量词在默认下是尽可能多的匹配的，也就是大家常说的贪婪模式

'123456789'.match(/\d{3,5}/g); //["12345", "6789"]
既然有贪婪模式，那么肯定会有非贪婪模式，让正则表达式尽可能少的匹配，也就是说一旦成功匹配不再继续尝试，做法很简单，在量词后加上?即可

'123456789'.match(/\d{3,5}?/g); //["123", "456", "789"]
分组
有时候我们希望使用量词的时候匹配多个字符，而不是像上面例子只是匹配一个，比如希望匹配Byron出现20次的字符串，我们如果写成 hunger{10} 的话匹配的是hunge＋r出现10次

    /hunger{10}/


怎么把hunger作为一个整体呢？使用()就可以达到此目的，我们称为分组

    /(hugner){10}/


或
var reg1 = /hello|world/ 
//等同于
var reg2 = /(hello)|(world)/
分组嵌套
举例：

从HTML字符串中取出 URL

var str = '<a href="http://jirengu.com">"饥人谷"</a>'
var reg = /href="((https?:)?\/\/.+?)"/
console.log(str.match(reg)) //["href="http://jirengu.com"", "http://jirengu.com", "http:"]

var url = str.match(reg)[1]


前瞻
表达式	含义
exp1(?=exp2)	匹配后面是exp2的exp1
exp1(?!exp2)	匹配后面不是exp2的exp1
有些抽象，看个例子

hunger(?=Byron)


(/good(?=Byron)/).exec('goodByron123'); //['good']
(/good(?=Byron)/).exec('goodCasper123'); //null
(/bad(?=Byron)/).exec('goodCasper123');//null
通过上面例子可以看出 exp1(?=exp2) 表达式会匹配exp1表达式，但只有其后面内容是exp2的时候才会匹配，也就是两个条件，exp1(?!exp2) 比较类似

good(?!Byron)

(/good(?!Byron)/).exec('goodByron123'); //null
(/good(?!Byron)/).exec('goodCasper123'); //['good']
(/bad(?!Byron)/).exec('goodCasper123');//null