webpack
webpack 2.x 官方文档
webpack 2.x 中文文档
webpack 1.x 文档
webpack 1.x 中文翻译
动机
现在的网站都向webapp进化：

页面中使用越来越多的js
现在浏览器提供更多接口
更少的页面重载刷新，页面中有更多的代码
导致浏览器端存在大量的代码。

大量代码需要被重新组织，于是出现了模块系统，用来代码分割成模块。

模块系统的风格
目前有很多标准用来定义依赖和导出模块

<script>标签风格（没有模块系统）
Commonjs
AMD规范以及对应实现
ES6模块
其它
<script>标签风格
如果没有使用模块系统你将会按如下方式处理模块化的代码

<script src="module1.js"></script>
<script src="module2.js"></script>
<script src="libraryA.js"></script>
<script src="module3.js"></script>
各个模块把接口暴露给全局对象，比如window对象。各个模块之间可以通过全局对象进行访问互相依赖的接口。

普遍的问题：

全局对象的冲突
加载的顺序是重要的
开发者需要解决模块的依赖问题
在大项目中模块引入的数目将会非常长并且难以维护
CommonJs：同步的require
这种风格使用同步的require方法来加载依赖和返回暴露的接口。一个模块可以通过给exports对象添加属性，或者设置module.exports的值来描述暴露对象。

require("module");
require("../file.js");
exports.doStuff = function() {};
module.exports = someValue;
CommonJs规范在服务端nodejs中使用。

优点：

服务端代码可以被重用
npm中有大量模块
用起来简单方便
缺点：

阻塞调用无法在网络环境应用，网络请求是异步的
不能并行requrie多个模块
CommonJs规范的实现

node.js -server端
browserify
modules-webmake - 编译成一个 bundle
wreq -client端
AMD：异步的require
异步模块定义

其他一些模块系统（针对浏览器）对同步的require(CommonJS 规范)有问题，于是引出了异步的版本（以及一种定义模块和导出值的方式）

require(["module", "../file"], function(module, file) { /* ... */ });
define("mymodule", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
优点：

符合了在网络中异步请求的风格
可以并行加载多个模块
缺点：

编码成本增加,可读性不好写起来麻烦
更像是一种临时修补方案
AMD 规范的实现有：

require.js - client 端
curl - client 端
ES6 模块
ECMAScript 2015 (6th Edition) 给 JavaScript添加了一些语法结构，用来实现另外一种模块系统

MDN-import import 在浏览器上能用吗

import "jquery";
export function doStuff() {}
module "localModule" {}
优点：

静态分析方便
作为ES的标准前途是光明
缺点：

浏览器支持还需要很长时间
这种风格的模块不多
无偏见的解决方案
开发者可以选择自己的模块风格，现存的代码库和包能正常工作，添加定制的模块风格也很方便。

传输
模块要在浏览器端运行，所以他们必须要从server端传输到浏览器端。

传输模块会出现两个极端：

每个模块是一个请求
一个请求包含了所有模块
这两种情况目前使用的都很普遍，但都不是最佳方案：

一个模块对应一个请求

优点：只有需要的模块被传输
缺点：多个请求意味着更多的额外的开销
缺点：请求的延迟导致你的应用启动很慢
一个请求包含所有模块

优点：更少的请求开销，更少的延迟
缺点：不需要的模块也会被传输
分块传输
如果有个更灵活的传输方式会更好. 大多数情况下折中方案是更好的选择。

-> 当编译所有模块时，将模块集分成多个较小的组(块)。

这会使得多个请求更小、更快. 初始化阶段不需要的模块组可以按需加载. 这样就可以加速初始加载，当你实际需要代码时也能加载更多的代码块。

「分割点」取决于开发者

-> 一个大的代码库也是可能的

阅读更多

除了JavaScript 能模块化,其它资源行不行？
不仅 JavaScript 需要模块化，许多其他的资源同样需要被处理：

stylesheets
images
webfonts
html模板
等等
或者需要被编译：

coffeescript -> javascript
elm -> javascript
less -> css
jade templates -> 生成html的js
i118n 文件 -> something
等等
使用起来应像下面这样方便：

require("./style.less");
require("./template.jade");
require("./image.png");
静态分析
当编译这些模块时，静态分析尝试寻找模块的所有依赖。

传统上静态分析寻找不能是表达式，但是require('./template/' + templateName + '.jade')是很普遍的结构。

许多第三方库都有不同的书写风格，一些非常诡异。

对策
一个聪明强大的解析器允许几乎所有现存的代码运行，但是开发者写了一些奇怪的代码，这需要找到最合适的解决方法。