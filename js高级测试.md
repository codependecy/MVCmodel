第 1 题
填空

var object = {}
object.__proto__ ===  ????填空1????  // 为 true

var fn = function(){}
fn.__proto__ === ????填空2????  // 为 true
fn.__proto__.__proto__ === ????填空3???? // 为 true

var array = []
array.__proto__ === ????填空4???? // 为 true
array.__proto__.__proto__ === ????填空5???? // 为 true

Function.__proto__ === ????填空6???? // 为 true
Array.__proto__ === ????填空7???? // 为 true
Object.__proto__ === ????填空8???? // 为 true

true.__proto__ === ????填空9???? // 为 true

Function.prototype.__proto__ === ????填空10???? // 为 true



1. Object.prototype
2. Function.prototype
3. Object.prototype
4. Array.prototype
5. Object.prototype
6. Function.prototype
7. Function.prototype
8. Function.prototype
9. Boolean.prototype
10. Object.prototype




第 2 题
function fn(){
    console.log(this)
}
new fn()
new fn() 会执行 fn，并打印出 this，请问这个 this 有哪些属性？这个 this 的原型有哪些属性？

这个this没有属性，除了公共隐藏的 proto
因为是通过new关键字来创建的
new 操作为了记录我们的临时对象是由哪个函数构成的，所以给这个原型 加上了一个constructor属性
这个属性里面记录了一些关于我们这个函数的特征，比如说name什么的。



第 3 题
JSON 和 JavaScript 是什么关系？
JSON 和 JavaScript 的区别有哪些？

## json和JavaScript有什么关系
json是一门新的语言，json是抄袭JavaScript的
## json和JavaScript的区别是什么
这是两门语言。并不相同
json带来了一个全新的数据格式，json有他自己的格式，其中有一种表现为键值对的方式，其中键必须加双引号 {"name": "he"}.
而JavaScript则是一门语言，其中JavaScript对象也可以通过键值对的形式表现出来，{"name": "he"}这就让人对这两种东西产生了误解。




第 4 题
前端 MVC 是什么？（10分）
请用代码大概说明 MVC 三个对象分别有哪些重要属性和方法。（10分）




## 前端MVC是什么
m代表 Model 操作数据
v代表 View     视图
c代表 controller 控制器
model数据和服务器交互，model可以将从服务器获取到的数据传给我们的controller，然后controller再把数据填充到view视图中，controller会一直监视view视图，如果用户操作了view，controller就会接收到信号，然后去调用我们的model，这样一层层下去。
简单点来说就是专门的人做专门的事，处理数据的就让他处理数据，展示数据的就让数据进行展示，结构化我们的代码，就像html开发中，css样式就放在css文件中，不要在html中随意的改动css样式，这样代码逻辑清晰，也为其他人看懂你的代码做了铺垫。
###
```
window.View = function(selector){
    return document.querySelector(selector)  //返回被操作的View视图
}
window.Model = function(){
    return {
        init: function(){}, //初始化数据
        fetch: function(){}, // 获取数据
        save: function(){} //保存数据
    }
}
//Controller会一直监视View视图，并且负责调用model，所以需要init。
//之后再去进行model的调用以及执行绑定的函数bindEvents
window.Controller = function(options){
    var init = options.init
    let object = {
        view: null,
        model: null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            init.call(this,view,model)
            this.bindEvents(this)
        },
    }
    //遍历传入的参数，开始处理业务。
    for(let key in options){
        if(key !== 'init'){
            object[key] = options[key]
        }
    }
    return object
}
```


第 5 题
在 ES5 中如何用函数模拟一个类？（10分）

通过new关键字来模拟
```
function Human(hp,mp){
    this.hp = hp
    this.mp = mp
}
Human.prototype.name = function(){}
var human = new Human('he')
//Human这个构造函数创建的对象有着自身的hp以及mp属性，在其原型上则有着我们之后设置的name属性
```

用过 Promise 吗？举例说明。
如果要你创建一个返回 Promise 对象的函数，你会怎么写？举例说明。


用过，在Ajax中。
在使用Promise之后我们会先执行Ajax，而不会去在意结果，之后再根据结果的成功或者失败来执行resolve或者reject函数。
![](//video.jirengu.com/xdml/image/91c35d38-8030-4d6c-85c6-4c25319570a2/2019-1-3-21-49-37.png)
https://github.com/codependecy/JSONP/blob/master/ajaxpromise.html
``` 
function fn(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            // 成功就调用resolve，失败就调用 reject
        },3000)
    })
}
``` 


